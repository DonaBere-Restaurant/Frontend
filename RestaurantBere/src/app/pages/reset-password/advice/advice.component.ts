import { Component } from '@angular/core';
import { PiepaginaComponent } from "../../../shared/components/piepagina/piepagina.component";
import { NavegadorComponent } from "../../../shared/components/navegador/navegador.component";

@Component({
  selector: 'app-advice',
  standalone: true,
  imports: [PiepaginaComponent, NavegadorComponent],
  templateUrl: './advice.component.html',
  styleUrl: './advice.component.scss'
})
export class AdviceComponent {

}
