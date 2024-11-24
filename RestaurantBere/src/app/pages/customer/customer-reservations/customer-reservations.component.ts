import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../../core/Services/Reserva/reserva.service';
import { CustomReservationResponseDTO } from '../../../shared/models/Reserva/reserva-detail';

@Component({
  selector: 'app-customer-reservations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-reservations.component.html',
  styleUrls: ['./customer-reservations.component.scss'],
  providers: [ReservaService]
})
export class CustomerReservationsComponent implements OnInit {
  reservations: CustomReservationResponseDTO[] = [];
  userId: number = 2; // Reemplaza con el ID de usuario actual

  private reservationService = inject(ReservaService);

  ngOnInit() {
    console.log('Obteniendo reservas...');
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getMyReservations(this.userId).subscribe(
      (data: CustomReservationResponseDTO[]) => {
        console.log('Reservas obtenidas:', data); // Agrega este console.log para verificar los datos
        this.reservations = data;
      },
      (error) => {
        console.error('Error fetching reservations', error);
      }
    );
  }
}