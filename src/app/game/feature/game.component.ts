import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Position } from '../../shared/ui/map/map.types';

@Component({
  selector: 'app-game',
  template: `
    <ng-container *ngIf="isPlaying && !isOver">
      <div
        class="h-screen w-screen"
        [ngClass]="{ invisible: isResourceLoading }"
      >
        <app-streetviewer
          [resourceId]="imageId"
          (resourceLoaded)="onResourceLoaded()"
          (resourceLoading)="onResourceLoading()"
        />

        <app-scoreboard />
        <app-position-picker (guessSubmitted)="onGuessSubmitted($event)" />
      </div>
      <app-spinner
        *ngIf="isResourceLoading"
        class="fixed top-0 left-0 w-full h-full bg-slate-950"
      />
    </ng-container>

    <ng-container *ngIf="!isPlaying && !isOver">
      <div class="flex flex-col h-screen w-screen">
        <app-map [autofitBounds]="true" [mapMarkers]="test" />
        <div class="bg-slate-950 h-1/4 flex justify-center">
          <div
            class="flex flex-col text-white bg-slate-900 w-full rounded-2xl max-w-7xl -translate-y-12 shadow-2xl z-[9999] h-fit p-10 space-y-4"
          >
            <div class="flex justify-center font-bold text-xl">
              4,079 points
            </div>
            <div class="justify-center flex">
              <app-progress-bar class="w-1/2" [percentageComplete]="0.5" />
            </div>
            <div class="flex justify-center">
              Your guess was <span class="font-bold"> 407</span>km from the
              correct location
            </div>
            <div class="w-1/4 relative inline-block">
                  <div class="absolute translate-y-1 inset-0 bg-lime-700 rounded-xl"></div>
                  <button class="relative w-full h-full bg-lime-600 text-white font-bold py-2 px-4 rounded-xl active:translate-y-1 active:bg-lime-600"
                  (click)="goToNextRound()">
                    Next Round
                  </button>
            </div>
          </div>
        </div>
      </div>
    </ng-container>

    <ng-container *ngIf="isOver">
      <div class="flex flex-col h-screen w-screen">
        <app-map [autofitBounds]="true" [mapMarkers]="test" />
        <div class="bg-slate-950 h-1/4 flex justify-center">
          <div
            class="flex flex-col text-white bg-slate-900 w-2/4 rounded-2xl -translate-y-12 shadow-2xl z-[9999] h-fit p-10 space-y-4"
          >
            <div class="flex justify-center font-bold text-xl">
              4,079 points
            </div>
            <div class="justify-center flex">
              <app-progress-bar class="w-1/2" [percentageComplete]="0.5" />
            </div>
            <div class="flex justify-center">
              The game is finished, Well done!
            </div>
            <div class="flex justify-center gap-x-4">
              <button class="bg-slate-700 p-3 rounded-2xl w-full">
                View Leaderboard
              </button>
              <button
                class="bg-violet-600 p-3 rounded-2xl w-full"
                (click)="goToNextRound()"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  imageId = '498763468214164';
  isPlaying = true;
  isResourceLoading = true;
  round = 1;
  isOver = false;

  test = [
    {
      position: {
        latitude: 46.879966,
        longitude: -121.726909,
      },
      connectedTo: {
        position: {
          latitude: 50,
          longitude: 50,
        },
      },
    },
    {
      position: {
        latitude: 50,
        longitude: 50,
      },
    },
  ];

  onGuessSubmitted(position: Position): void {
    if (this.round > 2) {
      this.isOver = true;
    }

    this.isPlaying = false;
  }

  goToNextRound(): void {
    if (this.round === 1) {
      this.imageId = '461631028397375';
      this.isPlaying = true;
      this.round++;
    } else if (this.round == 2) {
      this.imageId = '2978574139073965';
      this.isPlaying = true;
      this.round++;
    }
  }

  onResourceLoading(): void {
    this.isResourceLoading = true;
  }

  onResourceLoaded(): void {
    this.isResourceLoading = false;
  }
}