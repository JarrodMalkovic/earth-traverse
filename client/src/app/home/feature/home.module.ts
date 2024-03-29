import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { GameRoutingModule } from './home-routing.module';
import { NavbarModule } from 'src/app/shared/ui/navbar/navbar.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, GameRoutingModule, NavbarModule, RouterModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
