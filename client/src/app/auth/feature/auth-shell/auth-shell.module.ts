import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthShellRoutingModule } from './auth-shell-routing.module';

@NgModule({
    imports: [
        CommonModule,
        AuthShellRoutingModule,
    ],
})
export class AuthShellModule { }