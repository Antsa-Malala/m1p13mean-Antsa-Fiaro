import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';
import { Product } from 'src/app/demo/api/product';
import { Variant } from 'src/app/demo/api/variant';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  providers: [MessageService]  
})
export class PurchaseComponent implements OnInit {

  products: Product[] = [];          
  selectedProducts: Product[] = [];
  selectedProduct: Product | null = null; 
  selectedVariant: Variant | null = null; 
  quantity: number = 1;
  loading: boolean = false;           
  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    try{
      this.productService.getProducts()
          .then((data: Product[]) => this.products = data);
      } catch (err: any) {
          console.error(err);
          this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err?.message || 'Unexpected error occurred',
              life: 5000
          });
      }
  }

  //Ato le fonction achat no atao, mety mbola tokony misy argument user ko angamba
  purchaseProduct(){

    console.log(this.selectedVariant);

    console.log(this.quantity);
  }
}