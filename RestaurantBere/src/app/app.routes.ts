import { Routes } from '@angular/router';
import { NavegadorComponent } from './navegador/navegador.component';
import { CuerpoComponent } from './cuerpo/cuerpo.component';

export const routes: Routes = [
    { path: 'navbar', component: NavegadorComponent },
    { path: 'cuerpo', component: CuerpoComponent }
];
