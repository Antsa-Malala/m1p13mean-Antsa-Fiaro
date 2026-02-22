import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MediaDemoComponent } from './mediademo.component';
import { AuthRoleGuard } from '../../auth/auth-role-guard';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: MediaDemoComponent, canActivate: [AuthRoleGuard] }
    ])],
    exports: [RouterModule]
})
export class MediaDemoRoutingModule { }
