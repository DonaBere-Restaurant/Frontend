import { Routes } from '@angular/router';
import { SelectDateComponent } from './select-date/select-date.component';
import {SelectTableComponent} from './select-table/select-table.component';
import { MenuComponent } from './menu/menu.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { CrearcuentaComponent } from './crearcuenta/crearcuenta.component';


export const routes: Routes = [

    { path: 'reservasion', component: SelectDateComponent },
    { path: 'reservasion/mesas', component: SelectTableComponent },
    {path: 'reservasion/mesas/:id', component: SelectTableComponent},
    { path: 'reservasion/mesas/menu', component: MenuComponent },
    { path: 'reservasion/mesas/menu/datos', component: SelectDateComponent },
    { path: 'reservasion/mesas/menu/datos/pago', component: SelectDateComponent },
    { path: 'inicio', component: CuerpoComponent },  
    { path: 'crearcuenta', component: CrearcuentaComponent }, 
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }, 
    //{ path: '', redirectTo: 'index', pathMatch: 'full' },
    // { path: 'navCrearcuenta', component: NavcrearcuentaComponent},
    // { path: 'crearcuenta', component: CrearcuentaComponent},
    // { path: 'naviniciarsesion', component: NaviniciarsesionComponent},
    // { path: 'iniciarsesion', component: IniciarsesionComponent},
    // { path: 'piePagina', component: PiepaginaComponent},
];
