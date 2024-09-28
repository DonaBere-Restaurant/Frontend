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


@Component({
  selector: 'app-select-date',
  standalone: true,
  imports: [NgbDatepickerModule, FormsModule, JsonPipe,NgbTimepickerModule,RouterOutlet,CommonModule],
  templateUrl: './select-date.component.html',
  styleUrl: './select-date.component.scss'
})
export class SelectDateComponent {
  reserva: Reserva = new Reserva();
  time = { hour: 12, minute: 0 };  
  today: NgbDateStruct = inject(NgbCalendar).getToday();
  model: NgbDateStruct;  
  date: { year: number; month: number };
  isSubmitting = false; // Control de envío

  constructor(private reservaservice: ReservaService, private calendar: NgbCalendar) {}

  ngOnInit() {
    console.log(this.reserva);
  }

  setTime(hour: number, minute: number) {
    this.time = { hour, minute };
  }

  // Método para crear la reserva
  crearReserva() {
    this.isSubmitting = true;
    this.reservaservice.crearReservasion(this.reserva).subscribe(
      dato => {
        console.log(dato);
        this.isSubmitting = false;
      },
      error => {
        console.log(error);
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

      this.reservaservice.crearReservasion(this.reserva).subscribe(
        dato => {
          console.log(dato);
          this.isSubmitting = false;  
        },
        error => {
          console.log(error);
          this.isSubmitting = false;  
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
  pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}