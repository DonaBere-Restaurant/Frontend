import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SelectDateComponent } from './select-date/select-date.component';
import { MenuComponent } from './menu/menu.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { CrearcuentaComponent } from './crearcuenta/crearcuenta.component';
import { IniciarsesionComponent } from './iniciarsesion/iniciarsesion.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { PoliticaprivacidadComponent } from './politicaprivacidad/politicaprivacidad.component';
import { TerminoscondicionesComponent } from './terminoscondiciones/terminoscondiciones.component';


export const routes: Routes = [

    { path: 'reservasion', component: SelectDateComponent },
    { path: 'reservasion/mesas', component: SelectDateComponent },
    { path: 'reservasion/mesas/datos', component: SelectDateComponent },
    { path: 'reservasion/mesas/datos/pago', component: SelectDateComponent },
    { path: 'inicio', component: CuerpoComponent },  // Ruta a la página de inicio
    { path: 'crearcuenta', component: CrearcuentaComponent }, 
    { path: 'menu', component: MenuComponent },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //inicio apunta a cuerpo component
    { path: 'iniciarsesion', component: IniciarsesionComponent},
    { path: 'nosotros', component: NosotrosComponent},
    { path: 'politicas', component: PoliticaprivacidadComponent},
    { path: 'terminos', component: TerminoscondicionesComponent}
];
