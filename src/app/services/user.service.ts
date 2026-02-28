import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from '../demo/api/user';
import { Box } from '../demo/api/box';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = environment.apiUrl + '/api/users';
    private userSubject = new BehaviorSubject<any>(null);
    user$ = this.userSubject.asObservable();

    constructor(private http: HttpClient) {}

    loadUser() {
      this.http.get<any>(`${this.apiUrl}/me`).subscribe({
        next: (user) => {
          if (user?._id) {
            this.getMyBox(user._id).subscribe({
              next: (data: Box) => {
                user.box = data;
              },
              error: (err) => console.error(err)
            });
          }
          this.userSubject.next(user);
        },
        error: (err) => {
          console.error('Error loading user', err);
          this.userSubject.next(null);
        }
      });
    }

    getConnectedUser() {
      return this.userSubject.value;
    }

    getUsersByRole(role: string) {
        return this.http.get<any>(`${this.apiUrl}/roles/${role}`)
            .toPromise()
            .then(res => res as User[])
            .then(data => data);
    }

    getUser(id: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/${id}`);
    }
    
    availableShops() {
      return this.http.get<any>(`${this.apiUrl}/availableShops/`)
            .toPromise()
            .then(res => res as User[])
            .then(data => data);
    }

    updateUser(id: string, userData: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, userData);
    }

    deleteUser(id: string): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }

    signup(userData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/signup`, userData);
    }

    login(credentials: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, credentials);
    }

    logout() {
      localStorage.removeItem('token');
      this.userSubject.next(null);
    }

    getMyBox(userId: string) {
      return this.http.get<Box>(`${this.apiUrl}/myBox/${userId}`);
    }
}