import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SelectDateComponent } from './select-date/select-date.component';
import { MenuComponent } from './menu/menu.component';

import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { NavcrearcuentaComponent } from './navcrearcuenta/navcrearcuenta.component';
import { CrearcuentaComponent } from './crearcuenta/crearcuenta.component';
import { NaviniciarsesionComponent } from './naviniciarsesion/naviniciarsesion.component';
import { IniciarsesionComponent } from './iniciarsesion/iniciarsesion.component';
import { PiepaginaComponent } from './piepagina/piepagina.component';


export const routes: Routes = [

    { path: 'reservasion', component: SelectDateComponent },
    { path: 'reservasion/mesas', component: SelectDateComponent },
    { path: 'reservasion/mesas/datos', component: SelectDateComponent },
    { path: 'reservasion/mesas/datos/pago', component: SelectDateComponent },
    { path: 'inicio', component: CuerpoComponent },  // Ruta a la página de inicio
    { path: 'crearcuenta', component: CrearcuentaComponent }, 
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //inicio apunta a cuerpo component
    //{ path: '', redirectTo: 'index', pathMatch: 'full' },
    // { path: 'navCrearcuenta', component: NavcrearcuentaComponent},
    // { path: 'crearcuenta', component: CrearcuentaComponent},
    // { path: 'naviniciarsesion', component: NaviniciarsesionComponent},
    // { path: 'iniciarsesion', component: IniciarsesionComponent},
    // { path: 'piePagina', component: PiepaginaComponent},
];
