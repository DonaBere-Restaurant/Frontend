import { Routes } from '@angular/router';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { UpdateCustomerProfileComponent } from './update-customer-profile/update-customer-profile.component';
import { CustomerReservationsComponent } from './customer-reservations/customer-reservations.component';
export const customerRoutes: Routes = [

  {
    path:'',
    component:CustomerLayoutComponent,
    children:[
      { path: 'miperfil', component: CustomerProfileComponent},
      { path: 'miperfil/editar', component: UpdateCustomerProfileComponent},
      { path: 'miperfil/misreservaciones', component: CustomerReservationsComponent}
    ]
  }
];
