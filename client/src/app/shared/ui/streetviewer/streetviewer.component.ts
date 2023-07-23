import * as Mapillary from 'mapillary-js'

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core'

@Component({
  selector: 'app-streetviewer',
  template: ` <div #streetViewerContainer class="h-full w-full"></div> `,
  styleUrls: ['./streetviewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StreetViewerComponent {
  /**
   * Identifier for the resource to be displayed in the Street Viewer.
   */
  @Input()
  resourceId: string = '498763468214164'

  /**
   * Event emitted when the Street Viewer resource is fully loaded and ready.
   */
  @Output()
  resourceLoaded = new EventEmitter<void>()

  /**
   * Event emitted when the Street Viewer resource is fully loaded and ready.
   */
  @Output()
  resourceLoading = new EventEmitter<void>()

  @ViewChild('streetViewerContainer', { static: false })
  streetViewerContainer!: ElementRef<HTMLElement>

  private viewer: Mapillary.Viewer | undefined

  ngAfterViewInit(): void {
    this.viewer = new Mapillary.Viewer({
      accessToken: 'MLY|6536312276433375|492ec533701fe6474a0c8fd94c4a929c',
      container: this.streetViewerContainer.nativeElement,
      imageId: this.resourceId
    })

    // Allows the streetviewer to be navigatable immedietely once it has loaded
    this.viewer.deactivateCover()

    this.viewer.on('image', () => {
      this.resourceLoaded.emit()
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('resourceId' in changes) {
      this.viewer?.moveTo(this.resourceId)
      this.resourceLoading.emit()
    }
  }
}
