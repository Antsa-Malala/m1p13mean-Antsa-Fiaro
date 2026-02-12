import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginShopComponent } from './login-shop.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginShopComponent }
    ])],
    exports: [RouterModule]
})
export class LoginShopRoutingModule { }
