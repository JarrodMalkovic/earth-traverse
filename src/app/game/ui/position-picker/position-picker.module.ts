import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PositionPickerComponent } from './position-picker.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MapModule } from 'src/app/shared/ui/map/map.module';

@NgModule({
    imports: [CommonModule, FontAwesomeModule, MapModule],
    declarations: [PositionPickerComponent],
    exports: [PositionPickerComponent],
})
export class PositionPickerModule { }