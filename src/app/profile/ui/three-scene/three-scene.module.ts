import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThreeSceneComponent } from './three-scene.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ThreeSceneComponent],
    exports: [ThreeSceneComponent],
})
export class ThreeSceneModule { }