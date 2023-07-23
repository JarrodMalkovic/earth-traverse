import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarModule } from 'src/app/shared/ui/navbar/navbar.module';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing-module';

@NgModule({
    imports: [
        CommonModule,
        SignupRoutingModule,
        NavbarModule,
    ],
    declarations: [SignupComponent],
})
export class SignupModule { }