import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { MapMarker, Position } from '../../../shared/ui/map/map.types';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MapComponent } from '../../../shared/ui/map/map.component';
import {
  faArrowDown,
  faArrowUp,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { PositionPickerSize } from './position-picker.types';

@Component({
  selector: 'app-position-picker',
  template: `
    <div
      class="fixed bottom-6 right-6 rounded-lg z-10"
      [@enlargedState]="positionPickerSize"
      (@enlargedState.done)="onEnlargedStateAnimationComplete()"
      (mouseenter)="onMouseEnterPositionPicker()"
    >
      <div class="flex flex-col h-full">
        <div
          class="w-fit h-fit bg-black p-1 space-x-2 opacity-100 bg-opacity-50 rounded-t-lg"
        >
          <button
            class="w-6 h-6 bg-gray-100 rounded-3xl"
            (click)="onClosePositionPickerClick()"
          >
            <fa-icon [icon]="faXmark" />
          </button>
          <button
            class="w-6 h-6 bg-gray-100 rounded-3xl"
            (click)="onEnlargenPositionPickerClick()"
          >
            <fa-icon [icon]="faArrowUp" />
          </button>
          <button
            class="w-6 h-6 bg-gray-100 rounded-3xl"
            (click)="onShrinkPositionPickerClick()"
          >
            <fa-icon [icon]="faArrowDown" />
          </button>
        </div>
        <app-map
          [mapMarkers]="selectedMapMarker ? [selectedMapMarker] : undefined"
          (mapClicked)="onMapClicked($event)"
        />

        <button
          class="mt-3 w-full bg-black rounded-3xl h-12 text-white font-bold italic opacity-40 shadow-3xl"
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
        'small',
        style({
          width: '350px',
          height: '300px',
          opacity: '0.5',
        })
      ),
      state(
        'medium',
        style({
          width: '500px',
          height: '400px',
          opacity: '1',
        })
      ),
      state(
        'large',
        style({
          width: '700px',
          height: '500px',
          opacity: '1',
        })
      ),
      transition('void => *', [style({ opacity: '0' }), animate(0)]), // Initial load without transition
      transition('* <=> *', animate('50ms')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionPickerComponent {
  /**
   * Emits the position when a guess is submitted.
   */
  @Output()
  guessSubmitted = new EventEmitter<Position>();

  @ViewChild(MapComponent)
  mapComponent!: MapComponent;

  positionPickerSize: PositionPickerSize = PositionPickerSize.Small;
  selectedMapMarker: MapMarker | undefined;
  isMapEnlarged = false;

  faXmark = faXmark;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  onEnlargedStateAnimationComplete(): void {
    this.mapComponent.invalidateSize();
  }

  onMouseEnterPositionPicker(): void {
    if (this.positionPickerSize === PositionPickerSize.Small) {
      this.positionPickerSize = PositionPickerSize.Medium;
    }
  }

  onEnlargenPositionPickerClick(): void {
    this.positionPickerSize = PositionPickerSize.Large;
  }

  onShrinkPositionPickerClick(): void {
    if (this.positionPickerSize === PositionPickerSize.Large) {
      this.positionPickerSize = PositionPickerSize.Medium;
    } else if (this.positionPickerSize === PositionPickerSize.Medium) {
      this.positionPickerSize = PositionPickerSize.Small;
    }
  }

  onClosePositionPickerClick(): void {
    this.positionPickerSize = PositionPickerSize.Small;
  }

  onMapClicked(position: Position): void {
    this.selectedMapMarker = {
      position,
    };
  }

  submitGuess(): void {
    if (this.selectedMapMarker) {
      this.guessSubmitted.emit(this.selectedMapMarker.position);
      this.selectedMapMarker = undefined;
    }
  }
}
