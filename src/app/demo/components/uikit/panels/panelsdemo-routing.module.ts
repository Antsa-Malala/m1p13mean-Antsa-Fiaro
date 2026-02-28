import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanelsDemoComponent } from './panelsdemo.component';
import { AuthRoleGuard } from '../../auth/auth-role-guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PanelsDemoComponent, canActivate: [AuthRoleGuard] }
    ])],
    exports: [RouterModule]
})
export class PanelsDemoRoutingModule { }
