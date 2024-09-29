import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navegador',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navegador.component.html',
  styleUrl: './navegador.component.scss'
})
export class NavegadorComponent {
  isLoggedIn:boolean = false;
  constructor(private router: Router) { }
  navigateToCreateAcc() {
    this.router.navigate(['/crearcuenta']);
  }

  navigateToLogin() {
    this.router.navigate(['/iniciarsesion']);
  }

  cerrarSesion() {
    this.isLoggedIn = false;
  }
}
