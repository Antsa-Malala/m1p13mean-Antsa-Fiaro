import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LayoutService } from "./service/app.layout.service";
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    user: any;
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private userService: UserService, private router : Router) { }

    ngOnInit() {
        this.userService.loadUser();
        this.user = this.userService.getConnectedUser();
        this.userService.user$.subscribe(u => this.user = u);
    }
    
    logout() {
        const role = this.user?.role;

        this.userService.logout();

        const routes: any = {
            ADMIN: '/auth/seConnecterEnTantQuAdmin',
            SHOP: '/auth/loginShop',
            CUSTOMER: '/auth/login'
        };

        this.router.navigate([routes[role] || '/auth/login']);
    }
}
