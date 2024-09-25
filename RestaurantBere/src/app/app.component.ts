import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavegadorComponent } from "./navegador/navegador.component";
import { CuerpoComponent } from "./cuerpo/cuerpo.component";
import { PiepaginaComponent } from "./piepagina/piepagina.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavegadorComponent, CuerpoComponent, PiepaginaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RestaurantBere';
}
