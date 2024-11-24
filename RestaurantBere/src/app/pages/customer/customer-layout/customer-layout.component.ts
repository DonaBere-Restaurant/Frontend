import { Component } from '@angular/core';
import { NavegadorComponent } from "../../../shared/components/navegador/navegador.component";
import { PiepaginaComponent } from "../../../shared/components/piepagina/piepagina.component";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-customer-layout',
  standalone: true,
  imports: [RouterOutlet, NavegadorComponent, PiepaginaComponent],
  templateUrl: './customer-layout.component.html',
  styleUrl: './customer-layout.component.scss'
})
export class CustomerLayoutComponent {

}
