import { Component, inject } from '@angular/core';
import { NgbCalendar, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Reserva } from '../../Class/Reserva/reserva';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ReservaService } from '../../Services/Reserva/reserva.service';
import {ReservaDataService} from '../../Services/Reserva/reserva-data-service'

@Component({
  selector: 'app-select-date',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, JsonPipe,NgbTimepickerModule,RouterOutlet,CommonModule],
  templateUrl: './select-date.component.html',
  styleUrl: './select-date.component.scss'
})
export class SelectDateComponent {
  reserva: Reserva = new Reserva();
  errorMessage: string = '';  
  isSubmitting = false; // Control de envío
  time = { hour: 12, minute: 0 };  
  today: NgbDateStruct = inject(NgbCalendar).getToday();
  model: NgbDateStruct;  
  date: { year: number; month: number };
  
  constructor(private reservaservice: ReservaService, private calendar: NgbCalendar,private router: Router,
    private reservaDataService: ReservaDataService) {}

  ngOnInit() {
    console.log(this.reserva);
  }

  setTime(hour: number, minute: number) {
    this.time = { hour, minute };
  }
  navigateToCreateAcc() {
    this.router.navigate(['/inicio']);
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
        this.router.navigate(['/reservasion/mesas']);
      },
      error => {
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
      console.log('Formulario inválido');
    }
  }
  pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

}