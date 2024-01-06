import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarModule } from 'src/app/shared/ui/navbar/navbar.module';
import { SigninComponent } from './signin.component';
import { SigninRoutingModule } from './signin-routing-module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SigninRoutingModule,
    NavbarModule,
    ReactiveFormsModule,
  ],
  declarations: [SigninComponent],
})
export class SigninModule {}
