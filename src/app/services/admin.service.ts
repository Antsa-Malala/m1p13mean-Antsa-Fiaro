import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = environment.apiUrl + '/api/admins';

  constructor(private http: HttpClient) {}

  getAdmins(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getAdmin(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateAdmin(id: string, shopData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, shopData);
  }

  deleteAdmin(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  signup(shopData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, shopData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}