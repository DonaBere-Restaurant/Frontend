import { Component, Input} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../Services/LoginService';
import { IniciarsesionComponent } from '../iniciarsesion/iniciarsesion.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navegador',
  standalone: true,
  imports: [RouterLink, IniciarsesionComponent,CommonModule],
  templateUrl: './navegador.component.html',
  styleUrl: './navegador.component.scss'
})
export class NavegadorComponent {

  isLoggedIn: boolean = false;


  constructor(private router: Router, private loginService: LoginService) { }
  navigateToCreateAcc() {
    this.router.navigate(['/crearcuenta']);
  }

  navigateToLogin() {
    this.router.navigate(['/iniciarsesion']);
  }

  logout() {
    this.loginService.logout();
  }

  ngOnInit() {
    
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.isLoggedIn = true;
    }

    this.loginService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;  
    });
  }
}
