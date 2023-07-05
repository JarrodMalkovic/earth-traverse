import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileRoutingMoudle } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ThreeSceneModule } from '../ui/three-scene/three-scene.module';
import { NavbarModule } from 'src/app/shared/ui/navbar/navbar.module';
import { ProgressBarModule } from 'src/app/shared/ui/progress-bar/progress-bar.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingMoudle,
        ThreeSceneModule,
        NavbarModule,
        ProgressBarModule,
        NgApexchartsModule
    ],
    declarations: [ProfileComponent],
})
export class ProfileModule { }