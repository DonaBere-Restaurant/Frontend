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
import {CompletardatosComponent} from "./completardatos/completardatos.component";
import {ElejirplatosComponent} from "./elejirplatos/elejirplatos.component";
import {SelectTableComponent} from "./select-table/select-table.component"
import {DetallesreservamalComponent} from "./detallesreservamal/detallesreservamal.component";
import {DetallesreservabienComponent} from "./detallesreservabien/detallesreservabien.component";
import {NosotrosComponent} from "./nosotros/nosotros.component";
import {TerminoscondicionesComponent} from "./terminoscondiciones/terminoscondiciones.component";
import {PoliticaprivacidadComponent} from "./politicaprivacidad/politicaprivacidad.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavegadorComponent, CuerpoComponent, PiepaginaComponent, 
            CrearcuentaComponent, NavcrearcuentaComponent, NaviniciarsesionComponent, MenuComponent, FormsModule, SelectDateComponent,
            CompletardatosComponent, ElejirplatosComponent, DetallesreservabienComponent, 
            DetallesreservamalComponent, NosotrosComponent, TerminoscondicionesComponent, 
            PoliticaprivacidadComponent,SelectTableComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'RestaurantBere';
}
