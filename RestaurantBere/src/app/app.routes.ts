import { Routes } from '@angular/router';
import { SelectDateComponent } from './select-date/select-date.component';
import {SelectTableComponent} from './select-table/select-table.component';
import { MenuComponent } from './menu/menu.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';
import { CrearcuentaComponent } from './crearcuenta/crearcuenta.component';
import { ElejirplatosComponent } from './elejirplatos/elejirplatos.component';
import { CompletardatosComponent } from './completardatos/completardatos.component';
import { DetallesreservaComponent } from './detallesreserva/detallesreserva.component';
import { IniciarsesionComponent } from './iniciarsesion/iniciarsesion.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { PoliticaprivacidadComponent } from './politicaprivacidad/politicaprivacidad.component';
import { TerminoscondicionesComponent } from './terminoscondiciones/terminoscondiciones.component';
import { DetallesreservabienComponent } from './detallesreservabien/detallesreservabien.component';


export const routes: Routes = [

    { path: 'reservasion', component: SelectDateComponent },
    { path: 'reservasion/mesas', component: SelectTableComponent },
    //{path: 'reservasion/mesas/:id', component: SelectTableComponent},
    { path: 'menu', component: MenuComponent },
    { path: 'reservasion/mesas/menu', component: ElejirplatosComponent },
    { path: 'reservasion/mesas/menu/datos', component: CompletardatosComponent},
    { path: 'reservasion/mesas/menu/datos/resumen', component: DetallesreservaComponent},
    { path: 'reservasion/mesas/menu/datos/resumen/pago-completado', component: DetallesreservabienComponent },
    { path: 'inicio', component: CuerpoComponent },  
    { path: 'crearcuenta', component: CrearcuentaComponent }, 
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }, 
    //{ path: '', redirectTo: 'index', pathMatch: 'full' },
    // { path: 'navCrearcuenta', component: NavcrearcuentaComponent},
    // { path: 'crearcuenta', component: CrearcuentaComponent},
    // { path: 'naviniciarsesion', component: NaviniciarsesionComponent},
    // { path: 'iniciarsesion', component: IniciarsesionComponent},
    // { path: 'piePagina', component: PiepaginaComponent},
    { path: 'menu', component: MenuComponent },
    { path: '', redirectTo: 'inicio', pathMatch: 'full' }, //inicio apunta a cuerpo component
    { path: 'iniciarsesion', component: IniciarsesionComponent},
    { path: 'nosotros', component: NosotrosComponent},
    { path: 'politicas', component: PoliticaprivacidadComponent},
    { path: 'terminos', component: TerminoscondicionesComponent}
];
