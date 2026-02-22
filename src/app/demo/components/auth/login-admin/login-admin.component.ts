import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/services/user.service';

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

    email: string = '';
    password: string = '';
    
    constructor(public layoutService: LayoutService, private userService: UserService, private router: Router) { }
    
    onLogin() {
        const credentials = {
            email: this.email,
            password: this.password,
            role : "ADMIN"
        };

        this.userService.login(credentials).subscribe({
        next: (res: any) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('connectedUser', JSON.stringify(res.customer));

            this.router.navigate(['/error']);
        },
        error: (err) => {
            console.error('Erreur login', err);
            alert('Email ou mot de passe incorrect');
        }
        });
    }
}
