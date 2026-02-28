import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Box } from '../api/box';
import { environment } from 'src/environments/environment';


@Injectable()
export class BoxService {

    private apiUrl = environment.apiUrl + '/api/boxes';
    
    constructor(private http: HttpClient) { }

    getBoxesSmall() {
        return this.http.get<any>(this.apiUrl)
            .toPromise()
            .then(res => res as Box[])
            .then(data => data);
    }

    getBoxes() {
        return this.http.get<any>(this.apiUrl)
            .toPromise()
            .then(res => res as Box[])
            .then(data => data);
    }

    getBoxesMixed() {
        return this.http.get<any>(this.apiUrl)
            .toPromise()
            .then(res => res as Box[])
            .then(data => data);
    }

    getBoxesWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/boxs-orders-small.json')
            .toPromise()
            .then(res => res as Box[])
            .then(data => data);
    }

    createBox(formData: FormData) {
        return this.http.post(this.apiUrl, formData);
    }

    updateBox(id: string, formData: FormData) {
        return this.http.put(`${this.apiUrl}/${id}`, formData);
    }

    deleteBox(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
