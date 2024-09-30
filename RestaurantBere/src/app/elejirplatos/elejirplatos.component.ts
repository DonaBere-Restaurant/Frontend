import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Plato } from '../../Class/Plato/plato';
import {ReservaService} from '../../Services/Reserva/reserva.service'
import {PlatoService} from '../../Services/Platos/plato.service'
import { Reserva } from '../../Class/Reserva/reserva';
import {ReservationplatoRequest} from '../../Class/Plato/reservationplato-request'
import { ReservaDataService } from '../../Services/Reserva/reserva-data-service';
@Component({
  selector: 'app-elejirplatos',
  standalone: true,
  imports: [RouterOutlet,CommonModule,CommonModule,FormsModule],
  templateUrl: './elejirplatos.component.html',
  styleUrl: './elejirplatos.component.scss'
})
export class ElejirplatosComponent {
    reservationplatoRequest: ReservationplatoRequest = new ReservationplatoRequest();
    platos:Plato[];
    quantity: { [key: number]: number } = {};
    reservaId: number; 
    reserva: Reserva = new Reserva(); 
    constructor(private router: Router,private reservaservice: ReservaService,private route:ActivatedRoute,
      private platoservice:PlatoService,private reservaDataService: ReservaDataService

    )
    {

    }

    ngOnInit(): void {

      this.obtenerReserva();

    }
    obtenerReserva()
    {
      this.route.paramMap.subscribe(params => {
        this.reservaId = this.reservaDataService.getReservaId();
        
        if (this.reservaId) {
          this.getReservaById(this.reservaId);
        } else {
          console.error('No se encontró el ID de la reserva');
        }
      });
    }
    navigateToHome() {
      this.router.navigate(['/inicio']);
    }
  
    agregarPlato(platoId: number, cantidad: number) {
      if (cantidad && cantidad > 0) { // Verifica si la cantidad es mayor a 0
        if (!this.reservationplatoRequest.orderDishes.some(m => m.dishId === platoId)) {
          const plato = { dishId: platoId, quantity: cantidad };
          this.reservationplatoRequest.orderDishes.push(plato);
          console.log('Plato agregado:', platoId,"Cantidad:",cantidad);
        } else {
          console.warn('El plato ya ha sido agregado');
        }
      } else {
        console.warn('Debe ingresar una cantidad válida');
      }
    }
  enviarReservaPlatos() {
    // Asegura que el ID de reserva esté asignado
    this.reservationplatoRequest.id = this.reservaId;
    
    // Validación para asegurar que el ID de la reserva está disponible
    if (!this.reservationplatoRequest.id) {
      console.error('ID de la reserva no está asignado.');
      return;
    }
  
    // Enviar el request al backend con el formato esperado
    this.platoservice.agregarPlatos(this.reservationplatoRequest).subscribe(
      response => {
        console.log('Reserva enviada', response);
        // Redirige después de un envío exitoso
        this.router.navigate(['/reservasion/mesas/menu/datos']);
      },
      error => {
        console.error('Error al enviar la reserva:', error);
      }
    );
  }
  getReservaById(id: number): void {
    this.reservaservice.obtenerReservasion(id).subscribe(reserva => {
      this.reserva = reserva;  // Asignar la reserva obtenida
      console.log('Reserva obtenida:', this.reserva); // Debugging
      this.obtenerPlatos();
    }, error => {
      console.error('Error al obtener la reserva:', error);
    });
  }
  obtenerPlatos()
  {
    this.platoservice.getPlatos().subscribe(
      (data: Plato[]) => {
        this.platos = data; 
      },
      (error) => {
        console.error('Error al cargar los platos', error);
      }
    );
  }

  limpiarListas(): void {
    this.reservationplatoRequest.orderDishes = []; // Limpiar la lista de platos seleccionados
    console.log('Listas limpiadas');
  }
}
