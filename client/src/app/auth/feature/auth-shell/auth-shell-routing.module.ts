import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'signin',
        loadChildren: () => import('../signin/signin.module').then(m => m.SigninModule)
    },
    {
        path: 'signup',
        loadChildren: () => import('../signup/signup.module').then(m => m.SignupModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthShellRoutingModule { }