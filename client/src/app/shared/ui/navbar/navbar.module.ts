import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    ProgressBarModule,
    DropdownModule,
    RouterModule,
    FontAwesomeModule,
  ],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
