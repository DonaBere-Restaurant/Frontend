import { Component } from '@angular/core';

@Component({
  selector: 'app-elejirplatos',
  standalone: true,
  imports: [],
  templateUrl: './elejirplatos.component.html',
  styleUrl: './elejirplatos.component.scss'
})
export class ElejirplatosComponent {

  contador: number = 0;

  Aumentar() {
    this.contador++;
  }

  Disminuir() {
    if (this.contador > 0) {
      this.contador--;
    }
  }

  Ingreso(number: number){
    this.contador + number;
  }

}
