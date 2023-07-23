import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GameComponent } from './game.component';
import { MapModule } from 'src/app/shared/ui/map/map.module';
import { StreetViewerModule } from 'src/app/shared/ui/streetviewer/streetviewer.module';
import { PositionPickerModule } from '../ui/position-picker/position-picker.module';
import { ScoreboardModule } from '../ui/scoreboard/scoreboard.module';
import { ProgressBarModule } from 'src/app/shared/ui/progress-bar/progress-bar.module';
import { SpinnerModule } from 'src/app/shared/ui/spinner/spinner.module';
import { GameRoutingModule } from './game-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MapModule,
        StreetViewerModule,
        PositionPickerModule,
        ScoreboardModule,
        ProgressBarModule,
        SpinnerModule,
        GameRoutingModule
    ],
    declarations: [GameComponent],
})
export class GameModule { }