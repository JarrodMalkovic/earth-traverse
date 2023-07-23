import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-progress-bar',
  template: `
    <div class="w-full rounded-full bg-white/10 bg-opacity-90 backdrop-blur-lg"
      [ngClass]="{
        'h-3.5': size === 'md',
        'h-2': size === 'sm'
      }"
    >
      <div
        class="bg-lime-400 rounded-full"
        [ngClass]="{
        'h-3.5': size === 'md',
        'h-2': size === 'sm'
      }"
        [style.width.%]="percentageComplete * 100"
      ></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  @Input()
  percentageComplete: number = 0

  @Input()
  size: 'sm' | 'md' | 'lg' = 'md'
}
