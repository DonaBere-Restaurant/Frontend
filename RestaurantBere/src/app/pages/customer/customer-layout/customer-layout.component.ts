import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavegadorComponent } from "../../../shared/components/navegador/navegador.component";
import { PiepaginaComponent } from "../../../shared/components/piepagina/piepagina.component";

@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [RouterOutlet, NavegadorComponent, PiepaginaComponent, RouterLink, CommonModule],
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.scss']
})
export class CustomerLayoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  isActive(route: string): boolean {
    return this.router.isActive(route, {
      paths: 'exact',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }
}