import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginAdminComponent } from './login-admin.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LoginAdminComponent }
    ])],
    exports: [RouterModule]
})
export class LoginAdminRoutingModule { }
