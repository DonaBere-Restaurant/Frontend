import { Component } from '@angular/core';

@Component({
  selector: 'app-elejirplatos',
  standalone: true,
  imports: [],
  templateUrl: './elejirplatos.component.html',
  styleUrl: './elejirplatos.component.scss'
})
export class ElejirplatosComponent {

  contador1: number = 0;
  contador2: number = 0;
  contador3: number = 0;
  contador4: number = 0;
  contador5: number = 0;
  contador6: number = 0;

  total: number = 0;

  Aumentar(index: number):void {
    switch (index) {
      case 1:
        this.contador1++;
        break;
      case 2:
        this.contador2++;
        break;
      case 3:
        this.contador3++;
        break;
      case 4:
        this.contador4++;
        break;
      case 5:
        this.contador5++;
        break;
      case 6:
        this.contador6++;
        break;
      default:
        console.log("Índice no válido");
    }
    this.CalcularTotal();
  }

  Disminuir(index: number): void {
    switch (index) {
      case 1:
        if (this.contador1 > 0) {
          this.contador1--;
        }
        break;
      case 2:
        if (this.contador2 > 0) {
          this.contador2--;
        }
        break;
      case 3:
        if (this.contador3 > 0) {
          this.contador3--;
        }
        break;
      case 4:
        if (this.contador4 > 0) {
          this.contador4--;
        }
        break;
      case 5:
        if (this.contador5 > 0) {
          this.contador5--;
        }
        break;
      case 6:
        if (this.contador6 > 0) {
          this.contador6--;
        }
        break;
      default:
        console.log("Índice no válido");
    }
    this.CalcularTotal();
  }


  CalcularTotal(): void {
    this.total = this.contador1 + this.contador2 + this.contador3 + this.contador4 + this.contador5 + this.contador6;
  }

}
