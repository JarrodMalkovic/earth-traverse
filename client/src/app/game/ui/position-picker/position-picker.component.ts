import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  OnInit,
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
import { ScreenSizeService } from 'src/app/shared/data-access/screen-size.service';

@Component({
  selector: 'app-position-picker',
  template: `
    <div class="fixed bottom-6 right-6 rounded-2xl z-50">
      <button
        *ngIf="!isMapVisibleOnMobile"
        class="md:hidden w-full bg-black rounded-full p-6 text-white text-xl font-bold italic shadow-3xl"
        (click)="toggleMapVisibility()"
      >
        Guess now
      </button>
    </div>
    <div
      class="fixed bottom-6  right-0 md:right-6 md:px-6 rounded-lg z-10"
      [@enlargedState]="{
        value: positionPickerSize,
        params: {
          smallWidth: smallWidth,
          smallHeight: smallHeight,
          smallOpacity: smallOpacity,
          mediumWidth: mediumWidth,
          mediumHeight: mediumHeight,
          mediumOpacity: mediumOpacity,
          largeWidth: largeWidth,
          largeHeight: largeHeight,
          largeOpacity: largeOpacity
        }
      }"
      (@enlargedState.done)="onEnlargedStateAnimationComplete()"
      (mouseenter)="onMouseEnterPositionPicker()"
    >
      <div class="flex flex-col h-full">
        <ng-container *ngIf="isMapVisibleOnMobile || !isMobile">
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
            {{
              selectedMapMarker ? 'Submit Guess' : 'Place your pin on the map'
            }}
          </button>
        </ng-container>
      </div>
    </div>
  `,
  animations: [
    trigger('enlargedState', [
      state(
        'small',
        style({
          width: '{{smallWidth}}',
          height: '{{smallHeight}}',
          opacity: '{{smallOpacity}}',
        }),
        {
          params: {
            smallWidth: '350px',
            smallHeight: '300px',
            smallOpacity: '0.5',
          },
        }
      ),
      state(
        'medium',
        style({
          width: '{{mediumWidth}}',
          height: '{{mediumHeight}}',
          opacity: '{{mediumOpacity}}',
        }),
        {
          params: {
            mediumWidth: '500px',
            mediumHeight: '400px',
            mediumOpacity: '1',
          },
        }
      ),
      state(
        'large',
        style({
          width: '{{largeWidth}}',
          height: '{{largeHeight}}',
          opacity: '{{largeOpacity}}',
        }),
        {
          params: {
            largeWidth: '700px',
            largeHeight: '500px',
            largeOpacity: '1',
          },
        }
      ),
      transition('void => *', [style({ opacity: '0' }), animate(0)]),
      transition('* <=> *', animate('50ms')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PositionPickerComponent implements OnInit {
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
  isMobile = false;

  smallWidth!: string;
  smallHeight!: string;
  smallOpacity!: string;

  mediumWidth!: string;
  mediumHeight!: string;
  mediumOpacity!: string;

  largeWidth!: string;
  largeHeight!: string;
  largeOpacity!: string;

  faXmark = faXmark;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  isMapVisibleOnMobile = false;

  constructor(private screenSizeService: ScreenSizeService) {}

  ngOnInit() {
    this.isMobile = this.screenSizeService.isMobile();
    this.updateStylesBasedOnScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = this.screenSizeService.isMobile();
    this.updateStylesBasedOnScreenSize();
  }

  private updateStylesBasedOnScreenSize(): void {
    const isMobile = this.screenSizeService.isMobile();
    console.log(isMobile);

    // Update small state styles
    this.smallWidth = isMobile ? '100vw' : '350px';
    this.smallHeight = isMobile ? '50vh' : '300px';
    this.smallOpacity = '0.5';

    // Update medium state styles
    this.mediumWidth = isMobile ? '100vw' : '500px';
    this.mediumHeight = isMobile ? '50vh' : '400px';
    this.mediumOpacity = '1';

    // Update large state styles
    this.largeWidth = isMobile ? '100vw' : '700px';
    this.largeHeight = isMobile ? '50vh' : '500px';
    this.largeOpacity = '1';
  }

  toggleMapVisibility(): void {
    this.isMapVisibleOnMobile = !this.isMapVisibleOnMobile;
  }

  onEnlargedStateAnimationComplete(): void {
    this.mapComponent?.invalidateSize();
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
    if (this.screenSizeService.isMobile()) {
      this.isMapVisibleOnMobile = false;
    }

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
