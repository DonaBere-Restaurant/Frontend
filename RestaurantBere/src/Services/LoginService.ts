import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
 })

 export class LoginService{

    constructor(private router: Router){}

    private isLoggedInSubject = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.isLoggedInSubject.asObservable();

    login(email: string, password: string): void{
        if(email == 'gino@ejemplo.com' && password == 'example123'){
            console.log('Inicio de sesión exitoso');
            localStorage.setItem('isLoggedIn', 'true');
            this.isLoggedInSubject.next(true);
            this.router.navigate(['/inicio']);
        }else {
            alert('Credenciales incorrectas');
          }
    }

    logout(): void{
        console.log('Sesión cerrada');
        localStorage.removeItem('isLoggedIn');  
        this.router.navigate(['/iniciarsesion']);
        this.isLoggedInSubject.next(false);
    }
 }
