import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReservaDataService } from '../../../core/Services/Reserva/reserva-data-service';
import { ReservaService } from '../../../core/Services/Reserva/reserva.service';
import { Reserva } from '../../../shared/models/Reserva/reserva';
import { Orden } from '../../../shared/models/Orden/orden';
import { Reservasionmesa } from '../../../shared/models/ReservationTable/reservasionmesa';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-metodo-pago',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metodo-pago.component.html',
  styleUrl: './metodo-pago.component.scss'
})
export class MetodoPagoComponent {
  approvalUrl: string = '';
  private snackbar = inject(MatSnackBar); 
  reserva: Reserva = new Reserva(); 
  reservaId: number;
  platos: Orden[];
  mesas: Reservasionmesa[];
  private router = inject(Router);

  constructor(

    private reservaservice: ReservaService,
    private route: ActivatedRoute, 
    private reservaDataService: ReservaDataService
  ) {}

  ngOnInit() {
    const idreservaguardado = localStorage.getItem(`reserva_id_${this.reservaId}`);
    console.log(idreservaguardado);
    this.obtenerReserva(); // Llama a obtenerReserva al inicializar
  }

  obtenerReserva() {
    const idReservaguardado = localStorage.getItem('reserva_id')
    this.route.paramMap.subscribe(params => {
      this.reservaId = this.reservaDataService.getReservaId();
      
      if (this.reservaId) {
        this.getReservaById(this.reservaId);
        localStorage.setItem('reserva_id', this.reservaId.toString());
      } 
      if(idReservaguardado){
        this.reservaId = parseInt(idReservaguardado, 10);
        this.getReservaById(this.reservaId);
      }else {
        this.showSnackBar('No se encontró el ID de la reserva');
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
    console.log(this.reserva.id);
    this.reservaservice.pagarReserva(this.reserva.id).subscribe(
      (response) => {
        if (response.approvalUrl) {
          window.location.href = response.approvalUrl; // Redirige a PayPal
        }
      },
      (error) => {
        console.error('Error al procesar el pago:', error);
        this.showSnackBar('Ocurrió un error al procesar el pago. Intente de nuevo.');
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


  goIzipay()
  {
    this.reservaservice.pagarIzipay(this.reservaId).subscribe({
      next: (response) => {
        this.approvalUrl = response.approvalUrl;
        window.location.href = this.approvalUrl; // Redirigir al usuario a la URL de pago
      },
      error: (error) => {
        this.showSnackBar('Error al procesar el pago');
      }
    });
  }

  private showSnackBar(message: string): void {
    this.snackbar.open(message, 'Cerrar', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}
