import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavcrearcuentaComponent } from './navcrearcuenta/navcrearcuenta.component';
import { CrearcuentaComponent } from './crearcuenta/crearcuenta.component';
import { NaviniciarsesionComponent } from './naviniciarsesion/naviniciarsesion.component';
import { IniciarsesionComponent } from './iniciarsesion/iniciarsesion.component';
import { PiepaginaComponent } from './piepagina/piepagina.component';

export const routes: Routes = [
    { path: 'reservasion', component: AppComponent },
    { path: 'reservasion/mesas', component: AppComponent },
    { path: 'reservasion/mesas/datos', component: AppComponent },
    { path: 'reservasion/mesas/datos/pago', component: AppComponent },
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    // { path: 'navCrearcuenta', component: NavcrearcuentaComponent},
    // { path: 'crearcuenta', component: CrearcuentaComponent},
    // { path: 'naviniciarsesion', component: NaviniciarsesionComponent},
    // { path: 'iniciarsesion', component: IniciarsesionComponent},
    // { path: 'piePagina', component: PiepaginaComponent},
];
