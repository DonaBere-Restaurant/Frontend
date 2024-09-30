import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import {ReservaService} from '../../Services/Reserva/reserva.service';
import { ActivatedRoute } from '@angular/router';
import {ReservaDataService} from '../../Services/Reserva/reserva-data-service'
import { Reserva } from '../../Class/Reserva/reserva';
import{ReservationplatoRequest} from '../../Class/Plato/reservationplato-request'
import { Orden } from '../../Class/Orden/orden';
import { Reservasionmesa } from '../../Class/ReservationTable/reservasionmesa'
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-detallesreserva',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './detallesreserva.component.html',
  styleUrl: './detallesreserva.component.scss'
})
export class DetallesreservaComponent implements OnInit {
  reserva: Reserva = new Reserva(); 
  reservaId: number;
  platos: Orden[];
  mesas: Reservasionmesa[];

  constructor(
    private router: Router, 
    private reservaservice: ReservaService,
    private route: ActivatedRoute, 
    private reservaDataService: ReservaDataService
  ) {}

  ngOnInit() {
    this.obtenerReserva(); // Llama a obtenerReserva al inicializar
    this.handlePaymentReturn(); // Llama a handlePaymentReturn al inicializar
  }

  obtenerReserva() {
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
  
  getReservaById(id: number): void {
    this.reservaservice.obtenerReservasion(id).subscribe(reserva => {
      this.reserva = reserva;  // Asignar la reserva obtenida
      this.platos = reserva.orderDishes;
      this.mesas = reserva.tables;
      console.log('Reserva obtenida:', this.reserva);
    }, error => {
      console.error('Error al obtener la reserva:', error);
    });
  }

  GenerarPago() {
    this.reservaservice.pagarReserva(this.reserva.id).subscribe(
      (response) => {
        if (response.approvalUrl) {
          window.location.href = response.approvalUrl; // Redirige a PayPal
        }
      },
      (error) => {
        console.error('Error al procesar el pago:', error);
        alert('Ocurrió un error al procesar el pago. Intente de nuevo.');
      }
    );
  }

  handlePaymentReturn() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.handlePaymentSuccess(token); // Llama al método para procesar el pago
      }
    });
  }

  handlePaymentSuccess(token: string) {
    this.reservaservice.handlePaymentSuccess(token).subscribe(
      (redirectUrl) => {
        window.location.href = redirectUrl; // Redirige a la URL del frontend
      },
      (error) => {
        console.error('Error al procesar el éxito del pago:', error);
      }
    );
  }
}
