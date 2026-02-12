import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    name: string = '';
    mail: string = '';
    password: string = '';
    
    constructor(public layoutService: LayoutService, private customerService: CustomerService, private router: Router) { }
    
    onLogin() {
        const credentials = {
            mail: this.mail,
            password: this.password
        };

        this.customerService.login(credentials).subscribe({
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
