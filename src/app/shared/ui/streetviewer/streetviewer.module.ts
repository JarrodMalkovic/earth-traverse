import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StreetViewerComponent } from './streetviewer.component';

@NgModule({
    imports: [CommonModule],
    declarations: [StreetViewerComponent],
    exports: [StreetViewerComponent],
})
export class StreetViewerModule { }