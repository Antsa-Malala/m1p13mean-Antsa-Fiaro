import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../api/category';
import { environment } from 'src/environments/environment';


@Injectable()
export class CategoryService {

    private apiUrl = environment.apiUrl + '/api/categories';
    
    constructor(private http: HttpClient) { }

    getCategoriesSmall() {
        return this.http.get<any>(this.apiUrl)
            .toPromise()
            .then(res => res as Category[])
            .then(data => data);
    }

    getCategories() {
        return this.http.get<any>(this.apiUrl)
            .toPromise()
            .then(res => res as Category[])
            .then(data => data);
    }

    getCategoriesMixed() {
        return this.http.get<any>(this.apiUrl)
            .toPromise()
            .then(res => res as Category[])
            .then(data => data);
    }

    getCategoriesWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/categorys-orders-small.json')
            .toPromise()
            .then(res => res as Category[])
            .then(data => data);
    }

    createCategory(formData: FormData) {
        return this.http.post(this.apiUrl, formData);
    }

    updateCategory(id: string, formData: FormData) {
        return this.http.put(`${this.apiUrl}/${id}`, formData);
    }

    deleteCategory(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
