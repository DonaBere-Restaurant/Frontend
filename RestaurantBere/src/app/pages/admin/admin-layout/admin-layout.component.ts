import { Component } from '@angular/core';
import { NavegadorComponent } from "../../../shared/components/navegador/navegador.component";
import { PiepaginaComponent } from "../../../shared/components/piepagina/piepagina.component";
import { RouterOutlet, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, NavegadorComponent, PiepaginaComponent, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
