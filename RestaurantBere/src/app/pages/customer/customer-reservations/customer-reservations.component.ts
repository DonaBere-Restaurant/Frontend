import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../../core/Services/Reserva/reserva.service';
import { ResenaService } from "../../../core/Services/resena/resena.service";
import { FormsModule } from "@angular/forms";
import { CustomReservationResponseDTO } from '../../../shared/models/Reserva/CustomReservationResponseDTO';
import { ResenaRequestModel } from "../../../shared/models/Resena/resena-request-model";
import {StorageService} from "../../../core/Services/storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ResenaResponseModel} from "../../../shared/models/Resena/resena-response-model";

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
  resenas: ResenaRequestModel[] = []; // Reseñas
  private reservationService = inject(ReservaService);
  private resenaService = inject(ResenaService);
  private storageService = inject(StorageService);
  private snackBar = inject(MatSnackBar);


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
          calificacion: 0, // Inicializa la calificación
        }));
      },
      (error) => {
        console.error('Error fetching reservations', error);
      }
    );
  }

  toggleForm(reservation: CustomReservationResponseDTO) {
    reservation.showForm = !reservation.showForm;
    if (reservation.showForm) {
      this.resenaService.getResenaById(reservation.id).subscribe({
        next: (resena) => {
          reservation.comentario = resena.comentario || ''; // Inicializa el comentario si existe
          reservation.calificacion = resena.calificacion || 0; // Inicializa la calificación si existe
        },
        error: (error) => {
          console.warn(`No se encontró una reseña para la reserva con ID ${reservation.id}`, error);
          reservation.comentario = ''; // Resetea si no existe reseña
          reservation.calificacion = 0; // Resetea si no existe reseña
        },
      });
    }

  }

  submitResena(reservation: CustomReservationResponseDTO) {
    if(this.storageService.getAuthData()?.id === null) {}

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
        this.storageService.setResenaData(respuesta);
        reservation.showForm = false; // Ocultar formulario después de enviar
        reservation.comentario = ''; // Resetear comentario
        reservation.calificacion = 0; // Resetear calificación
      },
      error: (error) => {
        console.error('Error al crear la reseña:', error);
      },
    });
  }

  


  cancelarReserva(reservationId: number) {
    console.log('Cancelando reserva con ID:', reservationId);
    this.reservationService.cancelReservation(reservationId).subscribe(
      (response: string) => {
        console.log('Reserva cancelada:', response);
        // Actualizar la lista de reservas después de la cancelación
        this.getReservations();
        // Verificar el estado de la reserva después de un breve retraso
        setTimeout(() => {
          this.checkReservationStatus(reservationId);
        }, 3500); 
      },
      (error) => {
        console.error('Error canceling reservation', error);
        // Actualizar la lista de reservas después del error
        this.getReservations();
        // Verificar el estado de la reserva después de un breve retraso
        setTimeout(() => {
          this.checkReservationStatus(reservationId);
        }, 3500); 
      }
    );
  }

  checkReservationStatus(reservationId: number) {
    const reservation = this.reservations.find(r => r.id === reservationId);
    if (reservation && reservation.status === 0) {
      this.snackBar.open('Quedan menos de 4 horas para su reserva, no es posible cancelar', 'Cerrar', {
        duration: 3000, // Duración de la notificación en milisegundos
      });
    } else if (reservation && reservation.status === 2) {
      this.snackBar.open('La reserva ha sido cancelada', 'Cerrar', {
        duration: 3000, // Duración de la notificación en milisegundos
      });
    }
  }
}
