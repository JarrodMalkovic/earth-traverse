import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';

@NgModule({
    imports: [CommonModule,
        ProgressBarModule],
    declarations: [NavbarComponent],
    exports: [NavbarComponent],
})
export class NavbarModule { }