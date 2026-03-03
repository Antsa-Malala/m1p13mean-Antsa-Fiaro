import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    user: any;

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    orders! : number;

    ordersThisMonth! : number;

    income! : number;

    incomeThisMonth! : number;

    customer! : number;

    customerThisMonth! : number;

    shop! :  number;

    shopThisMonth! : number;

    boxOccupied! : number;

    boxAvailable! : number;

    boxMaintenance! : number;

    productsNumber! : number;

    productsThisMonth! : number;

    constructor(private productService: ProductService, public layoutService: LayoutService, private userService : UserService, private messageService : MessageService) {
    }

    ngOnInit() {
        this.loadStats();
        this.userService.loadUser();
        this.user = this.userService.getConnectedUser();
        this.userService.user$.subscribe(u => this.user = u);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    loadStats() {
        this.productService.dashboard().subscribe({
            next: (data: any) => {
                console.log(data);
                this.orders = data.orders;
                this.ordersThisMonth = data.ordersThisMonth;
                this.income = data.income?.toLocaleString('fr-FR');;
                this.incomeThisMonth = data.incomeThisMonth?.toLocaleString('fr-FR');;
                this.customer = data.customer;
                this.customerThisMonth = data.customerThisMonth;
                this.shop = data.shop;
                this.shopThisMonth = data.shopThisMonth;
                this.boxOccupied = data.boxOccupied;
                this.boxAvailable = data.boxAvailable;
                this.boxMaintenance = data.boxMaintenance;
                this.productsNumber = data.products;
                this.productsThisMonth = data.productsThisMonth;
            },
            error: (err: any) => {
                this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: err?.message || 'Unexpected error occurred',
                life: 5000
                });
            }
        });
    }
}
