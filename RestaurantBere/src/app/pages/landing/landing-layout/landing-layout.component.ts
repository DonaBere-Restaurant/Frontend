import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavegadorComponent } from "../../../shared/components/navegador/navegador.component";
import { PiepaginaComponent } from "../../../shared/components/piepagina/piepagina.component";

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [RouterOutlet, NavegadorComponent, PiepaginaComponent],
  templateUrl: './landing-layout.component.html',
  styleUrl: './landing-layout.component.scss'
})
export class LandingLayoutComponent {

}
