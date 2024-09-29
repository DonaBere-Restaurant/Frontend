import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
 })

 export class LoginService{

    private apiUrl = 'http://localhost:8080/api/v1'; 

    constructor(private router: Router, private http: HttpClient){}

    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.isLoggedInSubject.asObservable();

    Onlogin(userData: any): Observable<any> { 
        localStorage.setItem('isLoggedIn', 'true');
            this.isLoggedInSubject.next(true);
        return this.http.post<any>(`${this.apiUrl}/auth/login`, userData, { 
          responseType: 'text' as 'json' 
        });  // POST para iniciar sesion
      } 

    logout(): void{
        console.log('Sesión cerrada');
        localStorage.removeItem('isLoggedIn');  
        this.router.navigate(['/iniciarsesion']);
        this.isLoggedInSubject.next(false);
    }
 }
