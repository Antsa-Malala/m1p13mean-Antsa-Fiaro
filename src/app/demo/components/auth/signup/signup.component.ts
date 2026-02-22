import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/services/user.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    valCheck: string[] = ['remember'];

    name: string = '';
    address: string = '';
    email: string = '';
    password: string = '';
        
    constructor(public layoutService: LayoutService, private userService: UserService, private router: Router) { }
      
    onSignup() {
  
      const userData = {
        name: this.name,
        address : this.address,
        email: this.email,
        password: this.password,
        role : 'CUSTOMER'
      };
  
      this.userService.signup(userData).pipe(
  
        switchMap(() => {
          return this.userService.login({
            email: this.email,
            password: this.password,
            role : 'CUSTOMER'
          });
        })
  
      ).subscribe({
  
        next: (res: any) => {
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
