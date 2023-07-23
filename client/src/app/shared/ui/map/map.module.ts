import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


@NgModule({
  imports: [CommonModule, LeafletModule,],
  declarations: [MapComponent],
  exports: [MapComponent],
})
export class MapModule { }