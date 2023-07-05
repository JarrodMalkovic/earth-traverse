import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-scoreboard',
  template: `
    <div
      class="bg-black fixed top-6 right-6 p-2 rounded-lg flex divide-x-2 divide-black divide-opacity-20 shadow-2xl bg-opacity-70"
    >
      <div class="px-4 py-1 flex flex-col items-center">
        <h1 class="font-bold text-white text-md">Map</h1>
        <p class=" text-md text-white">Iceland</p>
      </div>
      <div class="px-4 py-1 flex flex-col items-center">
        <h1 class="font-bold text-white text-md">Round</h1>
        <p class=" text-md text-white">1/5</p>
      </div>
      <div class="px-4 py-1 flex flex-col items-center">
        <h1 class="font-bold text-white text-md">Score</h1>
        <p class=" text-md text-white">3232</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreboardComponent { }
