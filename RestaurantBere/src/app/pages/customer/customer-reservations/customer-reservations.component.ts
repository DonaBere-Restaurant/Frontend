import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../../core/Services/Reserva/reserva.service';
import { ResenaService } from "../../../core/Services/resena/resena.service";
import { FormsModule } from "@angular/forms";
import { CustomReservationResponseDTO } from '../../../shared/models/Reserva/CustomReservationResponseDTO';
import { ResenaRequestModel } from "../../../shared/models/Resena/resena-request-model";

@Component({
  selector: 'app-customer-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-reservations.component.html',
  styleUrls: ['./customer-reservations.component.scss'],
  providers: [ReservaService, ResenaService]
})
export class CustomerReservationsComponent implements OnInit {
  reservations: CustomReservationResponseDTO[] = []; // Reservas

  private reservationService = inject(ReservaService);
  private resenaService = inject(ResenaService);

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getMyReservations().subscribe(
      (data: CustomReservationResponseDTO[]) => {
        console.log('Reservas obtenidas:', data);
        // Agregamos propiedades auxiliares a cada reserva
        this.reservations = data.map(reservation => ({
          ...reservation,
          showForm: false, // Controla el formulario
          comentario: '', // Inicializa el comentario
          calificacion: null, // Inicializa la calificación
        }));
      },
      (error) => {
        console.error('Error fetching reservations', error);
      }
    );
  }

  toggleForm(reservation: CustomReservationResponseDTO) {
    reservation.showForm = !reservation.showForm;
  }

  submitResena(reservation: CustomReservationResponseDTO) {
    if (reservation.calificacion == null) {
      console.error('La calificación es requerida.');
      return;
    }

    const resena: ResenaRequestModel = {
      resena: reservation.comentario!,
      calificacion: reservation.calificacion!,
    };

    this.resenaService.crearReseña(reservation.id, resena).subscribe({
      next: (respuesta) => {
        console.log('Reseña creada exitosamente:', respuesta);
        reservation.showForm = false; // Ocultar formulario después de enviar
        reservation.comentario = ''; // Resetear comentario
        reservation.calificacion = null; // Resetear calificación
      },
      error: (error) => {
        console.error('Error al crear la reseña:', error);
      },
    });
  }


  newRating = 0;
  hoverRating = 0;

  rate(value: number) {
    this.newRating = value;
  }

  setHoverRating(value: number) {
    this.hoverRating = value;
  }



}
