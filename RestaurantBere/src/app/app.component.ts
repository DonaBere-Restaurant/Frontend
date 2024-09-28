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
import { FormsModule } from '@angular/forms';
import { SelectDateComponent } from "./select-date/select-date.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavegadorComponent, CuerpoComponent, PiepaginaComponent, CrearcuentaComponent, NavcrearcuentaComponent, NaviniciarsesionComponent,
    IniciarsesionComponent, MenuComponent, FormsModule, SelectDateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RestaurantBere';
}
