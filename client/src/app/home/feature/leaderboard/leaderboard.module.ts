import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeaderboardComponent } from './leaderboard.component';
import { GameRoutingModule } from './leaderboard-routing.module';
import { NavbarModule } from 'src/app/shared/ui/navbar/navbar.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, GameRoutingModule, NavbarModule, RouterModule],
  declarations: [LeaderboardComponent],
})
export class HomeModule {}
