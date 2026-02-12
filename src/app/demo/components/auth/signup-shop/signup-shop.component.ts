import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ShopService } from 'src/app/services/shop.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-signup-shop',
  templateUrl: './signup-shop.component.html',
  styleUrls: ['./signup-shop.component.scss']
})
export class SignupShopComponent {

  valCheck: string[] = ['remember'];

  name: string = '';
  password: string = '';
  
  constructor(public layoutService: LayoutService, private shopService: ShopService, private router: Router) { }

  onSignup() {

    const shopData = {
      name: this.name,
      password: this.password
    };

    this.shopService.signup(shopData).pipe(

      switchMap(() => {
        return this.shopService.login({
          name: this.name,
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
