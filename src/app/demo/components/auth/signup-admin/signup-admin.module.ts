import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupAdminRoutingModule } from './signup-admin-routing.module';
import { SignupAdminComponent } from './signup-admin.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  imports: [
    CommonModule,
    SignupAdminRoutingModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule
  ],
  declarations: [SignupAdminComponent]
})
export class SignupAdminModule { }