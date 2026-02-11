import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupAdminComponent } from './signup-admin.component';

@NgModule({
  imports: [RouterModule.forChild([
        { path: '', component: SignupAdminComponent }
    ])],
    exports: [RouterModule]
})
export class SignupAdminRoutingModule { }

