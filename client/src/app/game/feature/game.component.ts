import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Position } from '../../shared/ui/map/map.types';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../data-access/game.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  distinctUntilChanged,
  firstValueFrom,
  map,
  switchMap,
} from 'rxjs';
import { SeoService } from 'src/app/shared/utils/seo.service';

@Component({
  selector: 'app-game',
  template: `
    <!-- Games screen -->
    <ng-container *ngIf="isPlaying && !isOver">
      <div
        class="h-screen w-screen"
        [ngClass]="{ invisible: isResourceLoading }"
      >
        <app-streetviewer
          *ngIf="location$ | async as location"
          [resourceId]="location.resourceId"
          (resourceLoaded)="onResourceLoaded()"
          (resourceLoading)="onResourceLoading()"
        />

        <app-scoreboard
          *ngIf="game$ | async as game"
          [mapName]="game.map.title"
          [currentRound]="roundIndex$ | async"
          [totalRounds]="game.rounds.length"
          [currentScore]="currentScore$ | async"
        />

        <app-position-picker (guessSubmitted)="onGuessSubmitted($event)" />
      </div>
      <app-spinner
        *ngIf="isResourceLoading"
        class="test fixed top-0 left-0 w-full h-full bg-slate-950"
      />
    </ng-container>

    <!-- Score screen -->
    <ng-container *ngIf="!isPlaying && !isOver">
      <div class="flex flex-col h-screen w-screen">
        <div class="flex-grow min-h-0">
          <app-map
            *ngIf="mapMarkers$ | async as mapMarkers"
            [autofitBounds]="true"
            [mapMarkers]="mapMarkers"
          />
        </div>
        <div class="test flex justify-center items-center p-10">
          <div
            class="flex flex-col text-white background-blur-lg bg-white/10 w-full rounded-2xl max-w-7xl shadow-2xl z-[9999] h-fit p-10 space-y-4"
          >
            <div class="flex justify-center font-bold text-xl">
              {{ currentGuessScore$ | async }} points
            </div>
            <div class="justify-center flex">
              <app-progress-bar
                *ngIf="currentGuessScore$ | async as currentGuessScore"
                class="w-1/2"
                [percentageComplete]="currentGuessScore / 5000"
              />
            </div>
            <div class="flex justify-center">
              Your guess was
              <span class="font-bold mx-2">
                {{ currentGuessDistance$ | async }}km
              </span>
              from the correct location
            </div>
            <div class="flex justify-center">
              <div class="relative inline-block">
                <div
                  class="absolute translate-y-1 inset-0 bg-lime-600 rounded-xl"
                ></div>
                <button
                  class="relative w-full h-full bg-lime-500 text-white font-bold py-2 px-4 rounded-xl active:translate-y-1 active:bg-lime-500"
                  (click)="goToNextRound()"
                >
                  Next Round
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-container>

    <!-- End screen -->
    <ng-container *ngIf="isOver">
      <div class="flex flex-col h-screen w-screen">
        <app-map
          *ngIf="mapMarkers$ | async as mapMarkers"
          [autofitBounds]="true"
          [mapMarkers]="mapMarkers"
        />
        <div class="test flex justify-center items-center p-10">
          <div
            class="flex flex-col text-white background-blur-lg bg-white/10 w-full rounded-2xl max-w-7xl shadow-2xl z-[9999] h-fit p-10 space-y-4"
          >
            <div class="flex justify-center font-bold text-xl">
              {{ currentScore$ | async }} points
            </div>
            <div
              *ngIf="currentScore$ | async as currentScore"
              class="justify-center flex"
            >
              <app-progress-bar
                class="w-1/2"
                [percentageComplete]="currentScore / 15000"
              />
            </div>
            <div class="flex justify-center">
              The game is finished, Well done!
            </div>
            <div class="flex justify-center">
              <div class="relative inline-block">
                <div
                  class="absolute translate-y-1 inset-0 bg-lime-600 rounded-xl"
                ></div>
                <button
                  routerLink="/"
                  class="relative w-full h-full bg-lime-500 text-white font-bold py-2 px-4 rounded-xl active:translate-y-1 active:bg-lime-500"
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  isPlaying = true;
  isResourceLoading = true;
  isOver = false;
  game$!: Observable<any>;
  location$!: Observable<any>;

  private roundIndexSubject = new BehaviorSubject<number>(1);
  private currentScoreSubject = new BehaviorSubject<number>(0);
  private currentGuessDistanceSubject = new BehaviorSubject<number | null>(
    null
  );
  private currentGuessScoreSubject = new BehaviorSubject<number | null>(null);
  private mapMarkersSubject = new Subject<any>();
  mapMarkers$: Observable<any> = this.mapMarkersSubject.asObservable();
  roundIndex$: Observable<number> = this.roundIndexSubject.asObservable();
  currentScore$: Observable<number> = this.currentScoreSubject.asObservable();
  currentGuessDistance$: Observable<number | null> =
    this.currentGuessDistanceSubject.asObservable();
  currentGuessScore$: Observable<number | null> =
    this.currentGuessScoreSubject.asObservable();

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.game$ = this.route.params.pipe(
      distinctUntilChanged(
        (previous, current) => previous['id'] !== current['id']
      ),
      switchMap((params) => {
        const gameId = params['id'];
        return this.gameService.getGame(gameId);
      })
    );

    this.location$ = combineLatest([this.game$, this.roundIndexSubject]).pipe(
      map(([game, roundNumber]) => {
        const roundIndex = roundNumber - 1;
        return game && game.rounds && game.rounds[roundIndex]
          ? game.rounds[roundIndex].location
          : null;
      })
    );

    this.seoService.setPageTags({
      title: 'EarthTraverse Adventure - Immerse in the Game Now!',
      description:
        "Experience the thrill of exploration with EarthTraverse's live game. Navigate through unknown territories, uncover hidden treasures, and test your geographic skills in real-time. Join the ongoing adventure and challenge yourself!",
    });
  }

  async onGuessSubmitted(position: Position): Promise<void> {
    const [roundNumber, game] = await Promise.all([
      firstValueFrom(this.roundIndexSubject),
      firstValueFrom(this.game$),
    ]);

    this.gameService
      .submitAnswer(game.id, {
        roundNumber: roundNumber - 1,
        latitudeGuess: position.latitude,
        longitudeGuess: position.longitude,
      })
      .subscribe((response: any) => {
        const guessScore = Math.round(
          Math.max(0, (1 - response.distance / 25000) * 5000)
        );

        this.currentGuessDistanceSubject.next(Math.round(response?.distance));
        this.currentGuessScoreSubject.next(guessScore);
        this.currentScoreSubject.next(
          (this.currentGuessScoreSubject.getValue() || 0) + guessScore
        );
        const actualLocation = game.rounds[roundNumber - 1].location;

        this.mapMarkersSubject.next([
          {
            position: {
              latitude: response.latitudeGuess,
              longitude: response.longitudeGuess,
            },
            connectedTo: {
              position: {
                latitude: actualLocation.latitude,
                longitude: actualLocation.longitude,
              },
            },
          },
          {
            position: {
              latitude: actualLocation.latitude,
              longitude: actualLocation.longitude,
            },
          },
        ]);
      });

    this.roundIndexSubject.next(roundNumber + 1);

    if (roundNumber >= game.rounds.length) {
      this.isOver = true;
    }
    this.isPlaying = false;
  }

  goToNextRound(): void {
    this.isPlaying = true;
    this.isResourceLoading = true;
  }

  onResourceLoading(): void {
    this.isResourceLoading = true;
  }

  onResourceLoaded(): void {
    this.isResourceLoading = false;
  }
}
