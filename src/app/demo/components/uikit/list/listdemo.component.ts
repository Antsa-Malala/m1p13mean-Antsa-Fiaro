import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    templateUrl: './listdemo.component.html'
})
export class ListDemoComponent implements OnInit {

    user : any;

    products: Product[] = [];

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];

    isConfirmDisabled: boolean = true;

    constructor(private userService : UserService, private productService : ProductService, private router : Router, private messageService : MessageService) { }

    ngOnInit() {
        this.checkSelectedProducts();
        this.userService.loadUser();
        this.user = this.userService.getConnectedUser();
        this.userService.user$.subscribe(u => this.user = u);

        const data = sessionStorage.getItem('selectedProduct');
        this.products = data ? JSON.parse(data) : [];
        console.log(this.products);

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];
    }

    checkSelectedProducts(): void {
        const data = sessionStorage.getItem('selectedProduct');

        if (!data) {
            this.isConfirmDisabled = true;
            return;
        }

        try {
            const products = JSON.parse(data);
            this.isConfirmDisabled = !Array.isArray(products) || products.length === 0;
        } catch {
            this.isConfirmDisabled = true;
        }
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    removeProduct(productToRemove: any) {
        this.products = this.products.filter(p => p._id !== productToRemove._id);

        const data = sessionStorage.getItem('selectedProduct');
        if (data) {
            let products = JSON.parse(data);
            products = products.filter((p : Product)=> p._id !== productToRemove._id);
            sessionStorage.setItem('selectedProduct', JSON.stringify(products));
        }
        this.checkSelectedProducts();
    }

    confirmPurchase(): void {
        const data = sessionStorage.getItem('selectedProduct');

        if (!data) {
            this.messageService.add({
                severity:'warn',
                summary:'Warning',
                detail:'No item selected'
            });
            return;
        }

        let products: any[];
        products = JSON.parse(data);

        if (!Array.isArray(products) || products.length === 0) {
            this.messageService.add({
                severity:'warn',
                summary:'Warning',
                detail:'Empty product list'
            });
            return;
        }

        this.productService.confirmCart(products).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Purchase completed',
                    life: 3000
                });

                sessionStorage.removeItem('selectedProduct');

                setTimeout(() => {
                    this.router.navigate(['/sale']);
                }, 500);
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err?.error?.message || 'Server error occurred',
                    life: 5000
                });
            }
        });
    }
}
