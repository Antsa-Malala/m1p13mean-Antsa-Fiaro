import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleComponent } from './sale.component';
import { AuthRoleGuard } from '../auth/auth-role-guard';

const routes: Routes = [{ path: '', component: SaleComponent, canActivate: [AuthRoleGuard], data: { roles: ['CUSTOMER'] } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
