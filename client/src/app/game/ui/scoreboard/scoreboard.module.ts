import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScoreboardComponent } from './scoreboard.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ScoreboardComponent],
    exports: [ScoreboardComponent],
})
export class ScoreboardModule { }