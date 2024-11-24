import { Routes } from '@angular/router';
import {SelectTableComponent} from './pages/reserva/select-table/select-table.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { ElejirplatosComponent } from './pages/reserva/elejirplatos/elejirplatos.component';
import { CompletardatosComponent } from './shared/components/completardatos/completardatos.component';
import { DetallesreservaComponent } from './pages/reserva/detallesreserva/detallesreserva.component';
import { DetallesreservabienComponent } from './pages/reserva/detallesreservabien/detallesreservabien.component';


export const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(a => a.authRoutes)
    },
    {
        path:'inicio',
        loadChildren: () => import('./pages/landing/landing.routes').then(l => l.landingRoutes)
    },
    {
        path:'customer',
        loadChildren: () => import('./pages/customer/customer.routes').then(c => c.customerRoutes)
    },
    // { path: 'reservasion', component: SelectDateComponent },
    //{ path: 'reservasion/mesas', component: SelectTableComponent }, ////ALQUE LE TOCO RESERVACIO SEGUIR LAS RUTAS EN EL landing.routes.ts
    {   path: 'reservasion/mesas/:id', component: SelectTableComponent},
    { path: 'menu', component: MenuComponent },
    { path: 'reservasion/mesas/menu', component: ElejirplatosComponent },
    { path: 'reservasion/mesas/menu/datos', component: CompletardatosComponent},
    { path: 'reservasion/mesas/menu/datos/resumen', component: DetallesreservaComponent},
    { path: 'reservasion/mesas/menu/datos/resumen/pago-completado', component: DetallesreservabienComponent },  
    { path: 'menu', component: MenuComponent },
    { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirige la ruta raíz a 'inicio'
    { path: '**', redirectTo: '/inicio' } // Redirige cualquier ruta no encontrada a 'inicio'
];
