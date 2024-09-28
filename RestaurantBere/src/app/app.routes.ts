import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { CrearcuentaComponent } from './crearcuenta/crearcuenta.component';

export const routes: Routes = [
    { path: 'reservasion', component: AppComponent },
    { path: 'reservasion/mesas', component: AppComponent },
    { path: 'reservasion/mesas/datos', component: AppComponent },
    { path: 'reservasion/mesas/datos/pago', component: AppComponent },
    { path: 'inicio', component: CuerpoComponent },  // Ruta a la página de inicio
    { path: 'crearcuenta', component: CrearcuentaComponent }, 
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //inicio apunta a cuerpo component
];
