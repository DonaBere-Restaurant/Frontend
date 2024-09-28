import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SelectDateComponent } from './select-date/select-date.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
    { path: 'index', component: MenuComponent },
    { path: 'reservasion', component: SelectDateComponent },
    { path: 'reservasion/mesas', component: SelectDateComponent },
    { path: 'reservasion/mesas/datos', component: SelectDateComponent },
    { path: 'reservasion/mesas/datos/pago', component: SelectDateComponent },
    { path: '', redirectTo: 'index', pathMatch: 'full' },
];
