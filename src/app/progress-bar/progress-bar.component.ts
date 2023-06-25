import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-progress-bar',
  template: `
    <div class="w-full rounded-full h-2.5 bg-gray-700">
      <div
        class="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
        [style.width.%]="percentageComplete * 100"
      ></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  @Input()
  percentageComplete: number = 0
}
