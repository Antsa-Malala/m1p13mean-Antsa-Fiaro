import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../api/product';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

    private apiUrl = environment.apiUrl + '/api/products';
        
    constructor(private http: HttpClient, private userService : UserService) { }

    getProductsSmall(shopId? : string): Promise<Product[]> {
        if(shopId)
        {
            return this.http.get<any>(`${this.apiUrl}/min?shopId=${shopId}`)
                    .toPromise()
                    .then(res => res as Product[])
                    .then(data => data);
        } else{
            return this.http.get<any>(`${this.apiUrl}/min`)
                    .toPromise()
                    .then(res => res as Product[])
                    .then(data => data);
        }
    }

    getProducts() {
        return this.http.get<any>(`${this.apiUrl}`)
            .toPromise()
                .then(res => res as Product[])
                .then(data => data);
    }

    getProductsByShop(id : string) {
        return this.http.get<any>(`${this.apiUrl}/productsByShopId/${id}`)
            .toPromise()
                .then(res => res as Product[])
                .then(data => data);
    }

    getProductsForCustomer() {
        return this.http.get<any>(`${this.apiUrl}?status=INSTOCK`)
            .toPromise()
                .then(res => res as Product[])
                .then(data => data);
    }

    getAvailableProducts() {
        return this.http.get<any>(`${this.apiUrl}/available`)
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    createProduct(formData?: FormData) {
        return this.http.post(this.apiUrl, formData);
    }

    getProductById(id?: string)
    {
        return this.http.get<any>(`${this.apiUrl}/${id}`)
            .toPromise()
            .then(res => res as Product)
            .then(data => data);
    }

    updateProduct(id?: string, formData?: FormData) {
        return this.http.put(`${this.apiUrl}/${id}`, formData);
    }

    updateVariantProduct(id?: string, variantId?: string, formData?: FormData) {
        return this.http.put(`${this.apiUrl}/${id}/variants/${variantId}/stock`, formData);
    }

    deleteProduct(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    deleteVariant(productId: string, variantId: string) {
        return this.http.delete<Product>(`${this.apiUrl}/variant/${productId}/${variantId}`);
    }

    confirmCart(products : any[]){

        const purchaseList = products.map(p => ({
            productId: p._id,
            variantId: p.chosenVariant._id,
            quantity: p.chosenQuantity
        }));

        const body = { purchaseList };

        return this.http.post(`${this.apiUrl}/confirmCart`, body);
    }

    purchaseShop(productId?: string, variantId?: string, quantity?: number) {
        const body = { "stockToAdd" : quantity };
        return this.http.post(`${this.apiUrl}/stockEntry/${productId}/${variantId}`, body);
    }

    dashboard(): Observable<any> {
        return this.http.get(`${environment.apiUrl}/api/dashBoard`);
    }

}
