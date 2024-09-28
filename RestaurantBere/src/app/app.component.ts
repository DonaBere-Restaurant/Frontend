import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavegadorComponent } from "./navegador/navegador.component";
import { CuerpoComponent } from "./cuerpo/cuerpo.component";
import { PiepaginaComponent } from "./piepagina/piepagina.component";
import { CrearcuentaComponent } from "./crearcuenta/crearcuenta.component";
import { NavcrearcuentaComponent } from "./navcrearcuenta/navcrearcuenta.component";
import { NaviniciarsesionComponent } from './naviniciarsesion/naviniciarsesion.component';
import { IniciarsesionComponent } from "./iniciarsesion/iniciarsesion.component";
import { MenuComponent } from "./menu/menu.component";
import {CompletardatosComponent} from "./completardatos/completardatos.component";
import {ElejirplatosComponent} from "./elejirplatos/elejirplatos.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavegadorComponent, CuerpoComponent, PiepaginaComponent, CrearcuentaComponent, NavcrearcuentaComponent, NaviniciarsesionComponent, IniciarsesionComponent, MenuComponent, CompletardatosComponent, ElejirplatosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RestaurantBere';
}
