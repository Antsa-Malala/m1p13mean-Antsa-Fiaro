import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
        { path: 'signupAdmin', loadChildren: () => import('./signup-admin/signup-admin.module').then(m => m.SignupAdminModule) },
        { path: 'loginAdmin', loadChildren: () => import('./login-admin/login-admin.module').then(m => m.LoginAdminModule) },
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
