import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ShopService } from 'src/app/services/shop.service';

@Component({
    selector: 'app-login-shop',
    templateUrl: './login-shop.component.html',
    styleUrls: ['./login-shop.component.scss']
})
export class LoginShopComponent {

    valCheck: string[] = ['remember'];
    
    name: string = '';
    password: string = '';
    
    constructor(public layoutService: LayoutService, private shopService: ShopService, private router: Router) { }
  
    onLogin() {
      const credentials = {
        name: this.name,
        password: this.password
      };

      this.shopService.login(credentials).subscribe({
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
