import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
        { path: 'sInscrireEnTantQuAdmin', loadChildren: () => import('./signup-admin/signup-admin.module').then(m => m.SignupAdminModule) },
        { path: 'signupShop', loadChildren: () => import('./signup-shop/signup-shop.module').then(m => m.SignupShopModule) },
        { path: 'seConnecterEnTantQuAdmin', loadChildren: () => import('./login-admin/login-admin.module').then(m => m.LoginAdminModule) },
        { path: 'loginShop', loadChildren: () => import('./login-shop/login-shop.module').then(m => m.LoginShopModule) },
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
