import { Routes } from '@angular/router';
import { LandingLayoutComponent } from './landing-layout/landing-layout.component';
import { CuerpoComponent } from '../../shared/components/cuerpo/cuerpo.component';
import { TerminoscondicionesComponent } from '../../shared/components/terminoscondiciones/terminoscondiciones.component';
import { PoliticaprivacidadComponent } from '../../shared/components/politicaprivacidad/politicaprivacidad.component';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { NosotrosComponent } from '../../shared/components/nosotros/nosotros.component';
import { SelectDateComponent } from '../reserva/select-date/select-date.component';
import { SelectTableComponent } from '../reserva/select-table/select-table.component';

export const landingRoutes: Routes = [
    {
        path:'',
        component: LandingLayoutComponent,
        children:[
            { path: '', component: CuerpoComponent },
            { path: 'terminosycondiciones', component: TerminoscondicionesComponent},
            { path: 'politicasdeprivacidad', component: PoliticaprivacidadComponent},
            { path: 'menu', component: MenuComponent},
            { path: 'nosotros', component: NosotrosComponent},
            { path: 'reservacion', component: SelectDateComponent},
            { path: 'reservacion/mesas', component: SelectTableComponent}
        ]
    }
];