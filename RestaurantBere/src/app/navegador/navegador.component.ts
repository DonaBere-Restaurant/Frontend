import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegador',
  standalone: true,
  imports: [],
  templateUrl: './navegador.component.html',
  styleUrl: './navegador.component.scss'
})
export class NavegadorComponent {
  constructor(private router: Router) { }

  navigateToCreateAcc() {
    this.router.navigate(['/crearcuenta']);
  }
}
