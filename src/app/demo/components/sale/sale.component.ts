import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';
import { Product } from 'src/app/demo/api/product';
import { Variant } from 'src/app/demo/api/variant';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
  providers: [MessageService]  
})
export class SaleComponent implements OnInit {

  availableProducts : Product[] = [];
  selectedProducts : Product[] = [];
  expandedProductId: string | null = null;
  cartItems: { product: Product; variant: Variant }[] = [];

  constructor(
    private productService: ProductService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.loadAvailableProducts();
  }

  loadAvailableProducts(){
    try{
      this.productService.getProductsForCustomer() // ito fonction ito tokony ho fonction hafa, fa io aloha no nandeha de io no nampiasako 
          .then((data: Product[]) => this.availableProducts = data);
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
  
  displayVariants: boolean = false;
  selectedProduct: Product | null = null;
  selectedVariant: Variant | null = null;
  quantity: number = 1;


  openVariantSelector(product: Product) {
      this.selectedProduct = product;
      this.selectedVariant = null; 
      this.quantity = 1;           
      this.displayVariants = true;
  }

  //ito le manisy ao anaty panier, tsy mbola ao anaty session le izy fa efa afaka maka item maromaro
  confirmSelection() {
      if (this.selectedVariant) {
          const productToAdd = { 
              ...this.selectedProduct, 
              chosenVariant: this.selectedVariant, 
              chosenQuantity: this.quantity 
          };
          this.selectedProducts.push(productToAdd);
          this.displayVariants = false;
          console.log(this.selectedProducts);
          
      }
  }
}
