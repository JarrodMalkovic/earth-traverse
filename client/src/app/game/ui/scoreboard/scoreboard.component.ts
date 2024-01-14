import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  template: `
    <div
      class="bg-black fixed top-6 md:right-6 left-1/2 transform -translate-x-1/2 p-2 rounded-lg flex divide-x-2 divide-black divide-opacity-20 shadow-2xl bg-opacity-70 md:left-auto md:transform-none"
    >
      <div class="px-4 py-1 flex flex-col items-center">
        <h1 class="font-bold text-white text-md">Map</h1>
        <p class=" text-md text-white">{{ mapName }}</p>
      </div>
      <div class="px-4 py-1 flex flex-col items-center">
        <h1 class="font-bold text-white text-md">Round</h1>
        <p class=" text-md text-white">{{ currentRound }}/{{ totalRounds }}</p>
      </div>
      <div class="px-4 py-1 flex flex-col items-center">
        <h1 class="font-bold text-white text-md">Score</h1>
        <p class=" text-md text-white">{{ currentScore }}</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreboardComponent {
  @Input() mapName!: string;
  @Input() currentRound: number | null = 0;
  @Input() totalRounds!: number;
  @Input() currentScore: number | null = 0;
}
