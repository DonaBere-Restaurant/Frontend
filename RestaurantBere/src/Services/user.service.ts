import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/v1';  // URL de la API del backend

  constructor(private http: HttpClient) { }

  createUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, userData, { 
      responseType: 'text' as 'json' 
    });  // POST para crear usuario
  }
}
