import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
    selector: 'app-login-admin',
    templateUrl: './login-admin.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginAdminComponent {

    valCheck: string[] = ['remember'];

    name: string = '';
    password: string = '';
    
    constructor(public layoutService: LayoutService, private adminService: AdminService, private router: Router) { }
    
    onLogin() {
        const credentials = {
        name: this.name,
        password: this.password
        };

        this.adminService.login(credentials).subscribe({
        next: (res: any) => {
            localStorage.setItem('token', res.token);

            this.router.navigate(['/error']);
        },
        error: (err) => {
            console.error('Erreur login', err);
            alert('Email ou mot de passe incorrect');
        }
        });
    }
}
