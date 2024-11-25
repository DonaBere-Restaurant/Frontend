import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminReservasComponent } from './admin-reservas/admin-reservas.component';
import { AdminDishComponent } from './admin-dish/admin-dish.component';
import { AdminDrinkComponent } from './admin-drink/admin-drink.component';
import { AdminInformeComponent } from './admin-informe/admin-informe.component';
import { AdminResenasComponent } from './admin-resenas/admin-resenas.component';

export const adminRoutes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children:[
            { path:'miperfil', component: AdminProfileComponent},
            { path:'reservas', component: AdminReservasComponent},
            { path:'platos', component: AdminDishComponent},
            { path:'bebidas', component: AdminDrinkComponent},
            { path:'informe', component: AdminInformeComponent},
            { path:'resenas', component: AdminResenasComponent}

            // { path:'platos/editar/:id', component: EditDishComponent}
            // { path:'bebidas/editar/:id', component: EditDrinkComponent}
            // { path:'resenas/editar/:id', component: EditReviewComponent}
        ]
    }
];