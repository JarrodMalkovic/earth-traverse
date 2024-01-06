import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarModule } from 'src/app/shared/ui/navbar/navbar.module';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing-module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    NavbarModule,
    ReactiveFormsModule,
  ],
  declarations: [SignupComponent],
})
export class SignupModule {}
