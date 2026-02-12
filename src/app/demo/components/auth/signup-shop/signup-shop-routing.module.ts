import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupShopComponent } from './signup-shop.component';

@NgModule({
  imports: [RouterModule.forChild([
        { path: '', component: SignupShopComponent }
    ])],
    exports: [RouterModule]
})
export class SignupShopRoutingModule { }
