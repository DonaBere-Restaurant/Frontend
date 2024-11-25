import { Routes } from '@angular/router';
import { SelectTableComponent} from './pages/reserva/select-table/select-table.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { ElejirplatosComponent } from './pages/reserva/elejirplatos/elejirplatos.component';
import { DetallesreservaComponent } from './pages/reserva/detallesreserva/detallesreserva.component';
import { DetallesreservabienComponent } from './pages/reserva/detallesreservabien/detallesreservabien.component';
import { authInverseGuard } from './core/guards/auth/auth-inverse.guard';
import { authGuard } from './core/guards/auth/auth.guard';


export const routes: Routes = [

    {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.routes').then(a => a.authRoutes),
        canActivate:[authInverseGuard] 
    },
    {
        path:'inicio',
        loadChildren: () => import('./pages/landing/landing.routes').then(l => l.landingRoutes)
    },
    {
        path:'customer',
        loadChildren: () => import('./pages/customer/customer.routes').then(c => c.customerRoutes),
        canActivate:[authGuard]
    },

    { path: 'reservasion/mesas/:id', component: SelectTableComponent},

    {
        path:'admin',
        loadChildren: () => import('./pages/admin/admin.routes').then(a => a.adminRoutes)
    },
    { path: 'menu', component: MenuComponent },
    { path: 'menu', component: MenuComponent },
    { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirige la ruta raíz a 'inicio'
    { path: '**', redirectTo: '/inicio' } // Redirige cualquier ruta no encontrada a 'inicio'
];
