import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { LeafletModule } from '@asymmetrik/ngx-leaflet'
import { MapComponent } from './map/map.component'
import { MapillaryComponent } from './mapillary/mapillary.component'
import { NgModule } from '@angular/core'
import { PositionPickerComponent } from './position-picker/position-picker.component'
import { ScoreboardComponent } from './scoreboard/scoreboard.component'
import { StreetViewerComponent } from './streetviewer/streetviewer.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SpinnerComponent } from './spinner/spinner.component'

@NgModule({
  declarations: [
    AppComponent,
    MapillaryComponent,
    MapComponent,
    StreetViewerComponent,
    PositionPickerComponent,
    ScoreboardComponent,
    ProgressBarComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
