import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { MapService } from '../data-access/map.service';
import { GameService } from 'src/app/game/data-access/game.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <app-navbar></app-navbar>
    <div
      *ngIf="games$ | async as games"
      class="container mx-auto mt-8 max-w-7xl"
    >
      <div class="grid grid-cols-4 gap-8 mt-8">
        <div
          *ngFor="let game of games"
          class="backdrop-blur-lg bg-white/10 rounded-xl bg-opacity-90 flex flex-col justify-center items-center shadow-2xl"
        >
          <div class="h-32 w-full overflow-hidden rounded-t-xl">
            <a>
              <img
                class="h-full w-full object-cover rounded-t-xl hover:scale-110 transition duration-300"
                src="{{ game.image }}"
              />
            </a>
          </div>
          <div class="m-8 flex items-center flex-col space-y-6">
            <a class="text-white text-2xl font-bold hover:underline">
              {{ game.title }}
            </a>
            <button
              class="text-white border-zinc-100 border p-1 rounded-3xl italic w-24 hover:scale-110 transition duration-250"
              (click)="handlePlayGame(game.id)"
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  games$!: Observable<any[]>;

  constructor(
    private mapService: MapService,
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.games$ = this.mapService.getMaps();
  }

  async handlePlayGame(mapId: number): Promise<void> {
    const game = await firstValueFrom(
      this.gameService.createGame({ mapId, numberOfRounds: 3 })
    );
    this.router.navigate([`/play/${game.id}`]);
  }
}
