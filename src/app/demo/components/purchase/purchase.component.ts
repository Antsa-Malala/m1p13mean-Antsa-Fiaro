import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';
import { Product } from 'src/app/demo/api/product';
import { Variant } from 'src/app/demo/api/variant';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  providers: [MessageService]  
})
export class PurchaseComponent implements OnInit {
  user:any;
  products: Product[] = [];          
  selectedProducts: Product[] = [];
  selectedProduct: Product | null = null; 
  selectedVariant: Variant | null = null; 
  quantity: number = 1;
  loading: boolean = false;           
  constructor(
    private productService: ProductService,
    private messageService: MessageService, 
    private userService : UserService
  ) {}

    ngOnInit() {
      this.userService.loadUser();
      this.user = this.userService.getConnectedUser();

      this.userService.user$.subscribe((u) => {
        this.user = u;
        this.loadProducts();
      });
    }

  loadProducts() {
    try{
       this.productService.getProductsByShop(this.user._id)
                    .then((data: Product[]) => this.products = data);
      } catch (err: any) {
          this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err?.message || 'Unexpected error occurred',
              life: 5000
          });
      }
  }

  purchaseProduct(): void {

        if (!this.selectedProduct || !this.selectedVariant || !this.quantity) {
            this.messageService.add({
                severity:'warn',
                summary:'Warning',
                detail:'No product selected'
            });
            return;
        }

        this.productService.purchaseShop(this.selectedProduct?._id, this.selectedVariant?._id, this.quantity).subscribe({
            next: (res) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Restock completed',
                    life: 3000
                });
                this.loadProducts();
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