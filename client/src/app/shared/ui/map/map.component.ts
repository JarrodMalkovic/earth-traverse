import * as Leaflet from 'leaflet';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MapMarker, Position } from './map.types';

import { isDefined } from '../../utils/is-defined';

@Component({
  selector: 'app-map',
  template: ` <div class="h-full w-full" #mapContainer></div>`,
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnChanges, AfterViewInit, OnDestroy {
  /**
   * The initial zoom level of the map.
   */
  @Input()
  zoom: number = 1;

  /**
   * The initial latitude of the map center.
   */
  @Input()
  latitude: number = 46.879966;

  /**
   * The initial longitude of the map center.
   */
  @Input()
  longitude: number = -121.726909;

  /**
   * Determines whether the map automatically fits the bounds of the map markers.
   * When set to true, the map will adjust its view to display all the map markers within its bounds.
   */
  @Input()
  autofitBounds: boolean = false;

  /**
   * An array of map markers to be displayed on the map.
   */
  @Input()
  mapMarkers?: MapMarker[];

  /**
   * Emits the position when the map is clicked.
   */
  @Output()
  mapClicked = new EventEmitter<Position>();

  @ViewChild('mapContainer') mapContainer!: ElementRef<HTMLDivElement>;

  private map: Leaflet.Map | undefined;
  private mapMarkersLayer: Leaflet.Layer | undefined;
  /**
   * URL pattern for OpenStreetMap tile layer
   * See: https://wiki.openstreetmap.org/wiki/Tile_servers
   */
  private tileLayerURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  ngAfterViewInit(): void {
    const center =
      this.latitude && this.longitude
        ? Leaflet.latLng(this.latitude, this.longitude)
        : undefined;

    this.map = new Leaflet.Map(this.mapContainer.nativeElement, {
      layers: [Leaflet.tileLayer(this.tileLayerURL)],
      zoom: this.zoom,
      center,
    });

    this.map.on('click', (clickEvent) =>
      this.mapClicked.emit({
        latitude: clickEvent.latlng.lat,
        longitude: clickEvent.latlng.lng,
      })
    );

    if (this.mapMarkersLayer) {
      this.map.addLayer(this.mapMarkersLayer);
    }

    if (this.autofitBounds) {
      this.fitBounds();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('zoom' in changes) {
      this.map?.setZoom(this.zoom);
    }

    if ('latitude' in changes || 'longitude' in changes) {
      this.map?.setView(Leaflet.latLng(this.latitude, this.longitude));
    }

    if ('mapMarkers' in changes) {
      if (this.mapMarkersLayer) {
        this.map?.removeLayer(this.mapMarkersLayer);
      }

      const leafletMarkers =
        this.mapMarkers?.map(
          (mapMarker) =>
            new Leaflet.Marker(
              Leaflet.latLng(
                mapMarker.position.latitude,
                mapMarker.position.longitude
              ),
              {
                icon: new Leaflet.Icon.Default({
                  iconUrl: '/assets/marker-icon.png',
                  shadowSize: [0, 0],
                }),
              }
            )
        ) ?? [];

      const leafletLines =
        this.mapMarkers
          ?.filter((mapMarker) => isDefined<MapMarker>(mapMarker.connectedTo))
          .map(
            (mapMarker) =>
              new Leaflet.Polyline(
                [
                  [mapMarker.position.latitude, mapMarker.position.longitude],
                  [
                    mapMarker.connectedTo?.position?.latitude ?? 0,
                    mapMarker.connectedTo?.position?.longitude ?? 0,
                  ],
                ],
                {
                  color: 'black',
                  dashArray: '4, 5',
                }
              )
          ) ?? [];

      this.mapMarkersLayer = new Leaflet.LayerGroup([
        ...leafletMarkers,
        ...leafletLines,
      ]);

      this.map?.addLayer(this.mapMarkersLayer);

      if (this.autofitBounds) {
        this.fitBounds();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  /**
   * Invalidates the size of the map container.
   * This method should be called when the size of the container changes (e.g., when the
   * container is resized dynamically) to rerender the map to fill the new container size.
   */
  invalidateSize(): void {
    this.map?.invalidateSize();
  }

  /**
   * Adjusts the map view to fit the bounds of the map markers.
   * Calculates the bounds based on the latitude and longitude of each map marker
   * and updates the map view to display all the markers within the calculated bounds.
   */
  fitBounds(): void {
    const markerLatLngs =
      this.mapMarkers?.map((mapMarker) =>
        Leaflet.latLng(
          mapMarker.position.latitude,
          mapMarker.position.longitude
        )
      ) ?? [];

    if (markerLatLngs.length > 0) {
      const bounds = Leaflet.latLngBounds(markerLatLngs);
      this.map?.fitBounds(bounds);
    }
  }
}
