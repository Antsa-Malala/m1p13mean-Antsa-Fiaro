import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudBoxComponent } from './crud-box.component';
import { AuthRoleGuard } from '../../auth/auth-role-guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CrudBoxComponent, canActivate: [AuthRoleGuard], data: { roles: ['ADMIN'] }  }
	])],
	exports: [RouterModule]
})

export class CrudBoxRoutingModule { }
