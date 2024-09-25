import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { path: 'reservasion', component: AppComponent },
    { path: 'reservasion/mesas', component: AppComponent },
    { path: 'reservasion/mesas/datos', component: AppComponent },
    { path: 'reservasion/mesas/datos/pago', component: AppComponent },
    { path: '', redirectTo: 'index', pathMatch: 'full' },
];
