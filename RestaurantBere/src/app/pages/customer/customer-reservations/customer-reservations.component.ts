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

      this.resenaService.getResenaById(reservation.id).subscribe({
        next: (resena) => {
          reservation.comentario = resena.comentario; // Inicializa el comentario si existe
          reservation.calificacion = resena.calificacion; // Inicializa la calificación si existe
          reservation.resenaExistente = true; // Marca que hay una reseña existente

          // Inicializamos propiedades independientes para el formulario
          reservation.formComentario = reservation.comentario;
          reservation.formCalificacion = reservation.calificacion;
        },
        error: (error) => {
          console.warn(`No se encontró una reseña para la reserva con ID ${reservation.id}`, error);
          reservation.comentario = ''; // Resetea si no existe reseña
          reservation.calificacion = 0; // Resetea si no existe reseña
          reservation.resenaExistente = false; // Marca que hay una reseña existente
// Inicializamos las propiedades del formulario
          reservation.formComentario = '';
          reservation.formCalificacion = 0;
        },
      });


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



}
