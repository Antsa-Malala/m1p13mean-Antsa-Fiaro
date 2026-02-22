import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/services/user.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-signup-shop',
  templateUrl: './signup-shop.component.html',
  styleUrls: ['./signup-shop.component.scss']
})
export class SignupShopComponent {

  valCheck: string[] = ['remember'];

  name: string = '';
  email: string = '';
  password: string = '';
  
  constructor(public layoutService: LayoutService, private userService: UserService, private router: Router) { }

  onSignup() {

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      role : 'SHOP'
    };

    this.userService.signup(userData).pipe(

      switchMap(() => {
        return this.userService.login({
          email: this.email,
          password: this.password,
          role : 'SHOP'
        });
      })

    ).subscribe({

      next: (res: any) => {
        res.user.role = 'SHOP';
        localStorage.setItem('token', res.token);
        localStorage.setItem('connectedUser', JSON.stringify(res.user));

        this.router.navigate(['/error']);
      },

      error: (err) => {
        console.error('Erreur inscription/login', err);
        alert('Erreur lors de l’inscription');
      }

    });
  }
}
