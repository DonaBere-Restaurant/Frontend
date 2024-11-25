import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReservaService} from '../../../core/Services/Reserva/reserva.service'
import { Bebida } from '../../../shared/models/bebida/bebida-model';
import { Reserva } from '../../../shared/models/Reserva/reserva';
import { ReservaDataService } from '../../../core/Services/Reserva/reserva-data-service';
import { ReservationBebida } from '../../../shared/models/bebida/reservation-bebida-model';
import { DrinkService } from '../../../core/Services/bebidas/drinks.service';

@Component({
  selector: 'app-elegir-bebida',
  standalone: true,
  imports: [CommonModule,CommonModule,FormsModule],
  templateUrl: './elegir-bebida.component.html',
  styleUrl: './elegir-bebida.component.scss'
})
export class ElegirBebidaComponent {
  reservationBebida: ReservationBebida = new ReservationBebida();
  bebidas: Bebida[];
  quantity: {[Key: number]: number} = {};
  reservaId: number;
  reserva: Reserva = new Reserva();
  imageUrls: { [key: string]: any } = {};
  
  private router = inject(Router);
  private reservaService = inject(ReservaService);
  private route = inject(ActivatedRoute);
  private drinkService = inject(DrinkService);
  private reservaDataService = inject(ReservaDataService);

  ngOnInit(): void {
    this.obtenerReserva();
  }

  obtenerReserva(){
    this.route.paramMap.subscribe(params => {
      this.reservaId = this.reservaDataService.getReservaId();
      const idReservaguardado = localStorage.getItem('reserva_id')
      if (this.reservaId) {
        this.getReservaById(this.reservaId);
        localStorage.setItem('reserva_id', this.reservaId.toString());
      } 
      if(idReservaguardado){
        this.reservaId = parseInt(idReservaguardado, 10);
        this.getReservaById(this.reservaId);
       
      }else {
        console.error('No se encontró el ID de la reserva');
      }
    });
  }

  agregarBebida(bebidaId: number, quantity: number){
    if(quantity && quantity > 0){
      if(!this.reservationBebida.orderDrinks.some(b => b.drinkId === bebidaId)){
        const bebida = { drinkId: bebidaId, quantity: quantity };
        this.reservationBebida.orderDrinks.push(bebida);
        console.log('Bebida agregada:', bebidaId,"Cantidad:",quantity);
      } else {
        console.warn('La bebida ya ha sido agregada');
      }
    }else {
      console.warn('Debe ingresar una cantidad válida');
    }
  }

  enviarReservaBebidas(){
    this.reservationBebida.id = this.reservaId;

    if(!this.reservationBebida.id){
      console.error('ID de la reserva no está asignado.');
      return;
    }

    this.drinkService.agregarBebida(this.reservationBebida).subscribe(
      response => {
        console.log('Reserva de bebidas enviada correctamente:', response);
        this.router.navigate(['/inicio/reservacion/mesas/menu/drinks/resumen']); 
      },
      error => {
        console.error('Error al enviar la reserva de bebidas:', error);
    });
  }

  getReservaById(id: number): void {
    this.reservaService.obtenerReservasion(id).subscribe(reserva => {
      this.reserva = reserva;  // Asignar la reserva obtenida
      console.log('Reserva obtenida:', this.reserva); // Debugging
      this.obtenerBebidas();
    }, error => {
      console.error('Error al obtener la reserva:', error);
    });
  }

  obtenerBebidas(){
    this.drinkService.getAllDrinks().subscribe({
      next: (bebidas) => {
        this.bebidas = bebidas;
        this.bebidas.forEach(bebida => {
          this.cargarImagenBebida(bebida.image);
        });
      },
      error: (error) => console.error('Error al obtener las bebidas:', error)
    });
  }


  cargarImagenBebida(filename: string): void {
    console.log(`Cargando imagen para: ${filename}`);

    this.drinkService.cargarImagen(filename).subscribe(
      (data: Blob) => {
        const url = URL.createObjectURL(data);
        this.imageUrls[filename] = url;
      },
      (error) => {
        console.error('Error al cargar la imagen del plato', error);
      }
    );
  }

  limpiarLista(): void {
    this.reservationBebida.orderDrinks = []; // Limpiar la lista de bebidas seleccionadas
  }

  navigateToHome() {
    this.router.navigate(['/inicio']);
  }
  SkipBebidas()
  {
    this.router.navigate(['/inicio/reservacion/mesas/menu/drinks/resumen']); 
  }
}
