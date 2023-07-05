import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { LeafletModule } from '@asymmetrik/ngx-leaflet'
import { NgModule } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { GameModule } from './game/feature/game.module'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LeafletModule,
    FontAwesomeModule,
    GameModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
