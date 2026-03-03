import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-login-shop',
    templateUrl: './login-shop.component.html',
    styleUrls: ['./login-shop.component.scss']
})
export class LoginShopComponent {

    valCheck: string[] = ['remember'];

    email: string = 'extra@pizza.com';
    password: string = 'ExtraPizza1';
    errorMessage: string = '';
    
    constructor(public layoutService: LayoutService, private userService: UserService, private router: Router, private loadingService : LoadingService) { }
    
    onLogin() {
        const credentials = {
            email: this.email,
            password: this.password,
            role : "SHOP"
        };

        this.errorMessage = '';
        this.loadingService.show();
        this.userService.login(credentials).subscribe({
        next: (res: any) => {
            localStorage.setItem('token', res.token);
            this.loadingService.hide();
            this.router.navigate(['/profile']);
        },
        error: (err) => {
            this.loadingService.hide();
            this.errorMessage = 'Email ou mot de passe incorrect';
        }
        });
    }
}