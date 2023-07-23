import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarModule } from 'src/app/shared/ui/navbar/navbar.module';
import { SigninComponent } from './signin.component';
import { SigninRoutingModule } from './signin-routing-module';

@NgModule({
    imports: [
        CommonModule,
        SigninRoutingModule,
        NavbarModule,
    ],
    declarations: [SigninComponent],
})
export class SigninModule { }