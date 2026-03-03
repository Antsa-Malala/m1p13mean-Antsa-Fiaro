import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthRoleGuard } from '../auth/auth-role-guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent, canActivate: [AuthRoleGuard], data: { roles: ['ADMIN'] }  }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
