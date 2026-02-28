import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CrudCategoryComponent } from './crud-category.component';
import { AuthRoleGuard } from '../../auth/auth-role-guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CrudCategoryComponent, canActivate: [AuthRoleGuard], data: { roles: ['ADMIN'] }  }
	])],
	exports: [RouterModule]
})

export class CrudCategoryRoutingModule { }
