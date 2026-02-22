import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login-shop',
    templateUrl: './login-shop.component.html',
    styleUrls: ['./login-shop.component.scss']
})
export class LoginShopComponent {

    valCheck: string[] = ['remember'];

    email: string = '';
    password: string = '';
    errorMessage: string = '';
    
    constructor(public layoutService: LayoutService, private userService: UserService, private router: Router) { }
    
    onLogin() {
        const credentials = {
            email: this.email,
            password: this.password,
            role : "SHOP"
        };

        this.errorMessage = '';

        this.userService.login(credentials).subscribe({
        next: (res: any) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('connectedUser', JSON.stringify(res.user));

            this.router.navigate(['/uikit/overlay']);
        },
        error: (err) => {
            console.error('Erreur login', err);
            this.errorMessage = 'Email ou mot de passe incorrect';
        }
        });
    }
}