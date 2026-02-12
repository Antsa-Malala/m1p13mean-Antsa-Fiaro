import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupShopRoutingModule } from './signup-shop-routing.module';
import { SignupShopComponent } from './signup-shop.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  imports: [
    CommonModule,
    SignupShopRoutingModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule
  ],
  declarations: [SignupShopComponent]
})
export class SignupShopModule { }