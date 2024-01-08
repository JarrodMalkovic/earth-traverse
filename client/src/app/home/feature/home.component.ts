import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { MapService } from '../data-access/map.service';
import { GameService } from 'src/app/game/data-access/game.service';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/shared/data-access/api.model';

@Component({
  selector: 'app-home',
  template: `
    <app-navbar></app-navbar>
    <div
      *ngIf="games$ | async as response"
      class="container mx-auto mt-8 mb-8 max-w-7xl"
    >
      <ng-container *ngIf="response.status === 'loading'">
        <div class="grid grid-cols-4 gap-8 mt-8">
          <div
            *ngFor="let card of loadingCards"
            class="backdrop-blur-lg bg-white/10 rounded-xl bg-opacity-90 flex flex-col justify-center items-center shadow-2xl animate-pulse"
          >
            <div
              class="h-32 w-full overflow-hidden rounded-t-xl bg-gray-500 flex items-center justify-center"
            >
              <svg
                class="w-10 h-10 text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path
                  d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
                />
              </svg>
            </div>
            <div class="m-9 flex items-center flex-col space-y-6 w-full">
              <div class="h-7 w-2/4 bg-gray-500 rounded"></div>
              <div class="h-7 w-2/6 bg-gray-500 rounded"></div>
            </div>
          </div>
        </div>
      </ng-container>

      <ng-container *ngIf="response.status === 'success'">
        <div class="grid grid-cols-4 gap-8 mt-8">
          <div
            *ngFor="let game of response.result"
            class="backdrop-blur-lg bg-white/10 rounded-xl bg-opacity-90 flex flex-col justify-center items-center shadow-2xl"
          >
            <div class="h-32 w-full overflow-hidden rounded-t-xl">
              <a>
                <img
                  class="h-full w-full object-cover rounded-t-xl hover:scale-110 transition duration-300"
                  src="/assets/{{ game.image }}"
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
      </ng-container>

      <ng-container *ngIf="response.status === 'error'">
        <p>Error loading games.</p>
      </ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  games$!: Observable<ApiResponse<any[]>>;
  loadingCards = new Array(20).fill(0);

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
