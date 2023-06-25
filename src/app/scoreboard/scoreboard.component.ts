import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'app-scoreboard',
  template: `
    <div
      class="bg-gray-900 fixed top-10 right-10 p-2 rounded-lg flex divide-x-2 divide-gray-800 shadow-2xl opacity-70"
    >
      <div class="px-4 py-1 flex flex-col items-center">
        <h1 class="font-bold text-gray-200 text-md">Map</h1>
        <p class="font-bold text-md text-white">Iceland</p>
      </div>
      <div class="px-4 py-1 flex flex-col items-center">
        <h1 class="font-bold text-gray-200 text-md">Round</h1>
        <p class="font-bold text-md text-white">1/5</p>
      </div>
      <div class="px-4 py-1 flex flex-col items-center">
        <h1 class="font-bold text-gray-200 text-md">Score</h1>
        <p class="font-bold text-md text-white">3232</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreboardComponent {}
