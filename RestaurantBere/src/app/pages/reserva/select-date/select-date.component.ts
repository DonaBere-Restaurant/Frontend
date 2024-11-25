import { Component, inject } from '@angular/core';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Reserva } from '../../../shared/models/Reserva/reserva';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ReservaService } from '../../../core/Services/Reserva/reserva.service';
import {ReservaDataService} from '../../../core/Services/Reserva/reserva-data-service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-select-date',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule,NgbTimepickerModule, CommonModule],
  templateUrl: './select-date.component.html',
  styleUrl: './select-date.component.scss'
})
export class SelectDateComponent {
  private snackbar = inject(MatSnackBar); 
  reserva: Reserva = new Reserva();
  errorMessage: string = '';  
  isSubmitting = false; // Control de envío
  time = { hour: 12, minute: 0 };  
  today: NgbDateStruct = inject(NgbCalendar).getToday();
  model: NgbDateStruct;  
  date: { year: number; month: number };
  minDate = { year: 2024, month: 11, day: 25 }; // Fecha mínima
  maxDate = { year: 2025, month: 6, day: 30 }; // Fecha máxima
  showSpecialButton = false;
  constructor(private reservaservice: ReservaService, private calendar: NgbCalendar,private router: Router,
    private reservaDataService: ReservaDataService) {}

  ngOnInit() {
    console.log(this.reserva);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establece al inicio del día.
    this.minDate = {
      year: today.getFullYear(),
      month: today.getMonth() + 1, // Los meses en JavaScript son 0-indexados.
      day: today.getDate(),
    };
  }

  setTime(hour: number, minute: number) {
    this.time = { hour, minute };
    this.checkSpecialTime(hour);
  }
  navigateToCreateAcc() {
    this.router.navigate(['/inicio/reservacion']);
  }
  // Método para crear la reserva
  crearReserva() {
    this.isSubmitting = true;
    this.reservaservice.crearReservasion(this.reserva).subscribe(
      (dato: Reserva) => {
        console.log(dato);  // Aquí tienes el objeto completo de la reserva
        const reservaId = dato.id;  // Obtén el ID de la reserva recién creada
        this.isSubmitting = false;
        this.errorMessage = '';
        this.reservaDataService.setReservaId(dato.id); 
        // Redirige a la página para seleccionar mesas, pasando el ID de la reserva
        this.router.navigate(['/inicio/reservacion/mesas']);
      },
      (error) => {
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else if (error.message) {
          this.errorMessage = error.message;
        }
        console.log(this.errorMessage);
        this.isSubmitting = false;
      }
    );
  }
  createWithAllTable()
  {
    this.isSubmitting = true;
    console.log(this.reserva);
    this.isSubmitting = true;
    this.reservaservice.crearReservaWithAllTables(this.reserva).subscribe(
      (respuesta) => {
        console.log('Reserva creada:', respuesta);
        this.showSnackBar('Reserva creada:'); 
        this.isSubmitting = false;
        this.reservaDataService.setReservaId(respuesta.id);
        this.router.navigate(['/inicio/reservacion/mesas/menu']);
      },
      (error) => {

          this.showSnackBar(error.error.error); 
        this.isSubmitting = false;
      }
    );
  }

  prepareAllTableReservation() {    

      if (!this.model || !this.time) {
        this.showSnackBar('Por favor, seleccione una fecha y hora válidas.');
        return;
      }

   
      const selectedDate = `${this.model.year}-${this.pad(this.model.month)}-${this.pad(this.model.day)}`;
      const selectedTime = `${this.pad(this.time.hour)}:${this.pad(this.time.minute)}`;

      this.reserva.date = selectedDate;
      this.reserva.startTime = selectedTime;

        console.log('Preparando reserva con todas las mesas:', this.reserva);

         
      this.createWithAllTable();


  }

  onSubmit(form: NgForm, event: Event) {
    event.preventDefault();  
  
    if (form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
  
      const selectedDate = `${this.model.year}-${this.pad(this.model.month)}-${this.pad(this.model.day)}`;
      const selectedTime = `${this.pad(this.time.hour)}:${this.pad(this.time.minute)}`;
  
      this.reserva.date = selectedDate;  
      this.reserva.startTime = selectedTime;   

      this.crearReserva();
    } else {
      this.showSnackBar('Formulario inválido');
    }
  }
  pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  private showSnackBar(message: string): void {
    this.snackbar.open(message, 'Cerrar', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
  
  checkSpecialTime(hour: number) {
    this.showSpecialButton = hour === 12 || hour === 18; // Mostrar botón si es 12 o 18
  }

}