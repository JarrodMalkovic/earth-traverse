import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core'
import { MapMarker, Position } from '../map/map.types'
import { animate, state, style, transition, trigger } from '@angular/animations'

import { MapComponent } from '../map/map.component'

@Component({
  selector: 'app-position-picker',
  template: `
    <div 
      class="fixed bottom-10 right-10 rounded-lg z-10" 
      [@enlargedState]="isMapEnlarged ? 'enlarged' : 'default'"
      (@enlargedState.done)="onEnlargedStateAnimationComplete()"
      (mouseenter)="onMouseEnterPositionPicker()"
    >
      <div class="flex flex-col h-full">
        <app-map [mapMarkers]="selectedMapMarker ? [selectedMapMarker] : undefined" (mapClicked)="onMapClicked($event)"/>
        <button
          class="mt-3 w-full bg-slate-900 rounded-3xl h-12 text-white font-bold italic opacity-40 shadow-2xl"
          [class.opacity-40]="!selectedMapMarker"
          [disabled]="!selectedMapMarker"
          (click)="submitGuess()"
        >
          {{ selectedMapMarker ? 'Submit Guess' : 'Place your pin on the map' }}
        </button>
      </div>
    </div>
  `,
  animations: [
    trigger('enlargedState', [
      state(
        'default',
        style({
          width: '350px',
          height: '300px',
          opacity: '0.5'
        })
      ),
      state(
        'enlarged',
        style({
          width: '500px',
          height: '400px',
          opacity: '1'
        })
      ),
      transition('default <=> enlarged', animate('25ms'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionPickerComponent {
  /**
   * Emits the position when a guess is submitted.
   */
  @Output()
  guessSubmitted = new EventEmitter<Position>()

  @ViewChild(MapComponent)
  mapComponent!: MapComponent

  selectedMapMarker: MapMarker | undefined
  isMapEnlarged = false

  onEnlargedStateAnimationComplete (): void {
    this.mapComponent.invalidateSize()
  }

  onMouseEnterPositionPicker (): void {
    this.isMapEnlarged = true
  }

  onMapClicked (position: Position): void {
    this.selectedMapMarker = {
      position
    }
  }

  submitGuess (): void {
    if (this.selectedMapMarker) {
      this.guessSubmitted.emit(this.selectedMapMarker.position)
      this.selectedMapMarker = undefined
    }
  }
}
