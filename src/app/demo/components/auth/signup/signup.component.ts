import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CustomerService } from 'src/app/services/customer.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    valCheck: string[] = ['remember'];

    name: string = '';
    mail: string = '';
    password: string = '';
        
    constructor(public layoutService: LayoutService, private customerService: CustomerService, private router: Router) { }
      
    onSignup() {
  
      const customerData = {
        name: this.name,
        mail: this.mail,
        password: this.password
      };
  
      this.customerService.signup(customerData).pipe(
  
        switchMap(() => {
          return this.customerService.login({
            mail: this.mail,
            password: this.password
          });
        })
  
      ).subscribe({
  
        next: (res: any) => {
          localStorage.setItem('token', res.token);
  
          this.router.navigate(['/error']);
        },
  
        error: (err) => {
          console.error('Erreur inscription/login', err);
          alert('Erreur lors de l’inscription');
        }
      });
    }
}
