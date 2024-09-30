import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Reserva } from '../../Class/Reserva/reserva';
import { ReservaService } from '../../Services/Reserva/reserva.service';
import { ReservaDataService } from '../../Services/Reserva/reserva-data-service';
import {ReservationRequest} from '../../Class/ReservationTable/reservation-request'
import { MesaService } from '../../Services/Mesa/mesa.service';
import { ActivatedRoute } from '@angular/router';
import { Mesa } from '../../Class/Mesa/mesa';
import {ElejirplatosComponent} from '../../app/elejirplatos/elejirplatos.component'
@Component({
  selector: 'app-select-table',
  standalone: true,
  imports: [RouterOutlet,CommonModule,CommonModule,FormsModule,ElejirplatosComponent],
  templateUrl: './select-table.component.html',
  styleUrl: './select-table.component.scss'
})

export class SelectTableComponent {
  reservationRequest: ReservationRequest = new ReservationRequest();
  mesasDisponibles: Mesa[] = [];
  reservaId: number; 
  reserva: Reserva = new Reserva(); 
  constructor(private router: Router,private reservaservice: ReservaService,private route:ActivatedRoute,
    private reservaDataService: ReservaDataService, private mesaservice:MesaService,
  ){}
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.reservaId = this.reservaDataService.getReservaId();
      
      if (this.reservaId) {
        this.getReservaById(this.reservaId);
      } else {
        console.error('No se encontró el ID de la reserva');
      }
    });
  }

  navigateToCreateAcc() {
    this.router.navigate(['/reservasion']);
  }

  onSubmit(form: NgForm, event: Event) {}

  getReservaById(id: number): void {
    this.reservaservice.obtenerReservasion(id).subscribe(reserva => {
      this.reserva = reserva;  // Asignar la reserva obtenida
      console.log('Reserva obtenida:', this.reserva); // Debugging
      this.cargarMesas();
    }, error => {
      console.error('Error al obtener la reserva:', error);
    });
  }
  cargarMesas(): void {
    console.log('Fecha:', this.reserva.date); 
    console.log('Hora Inicio:', this.reserva.startTime); 
    
    // Llama a tu servicio para cargar mesas disponibles usando fecha y horaInicio
    this.mesaservice.getfreetables(this.reserva.date, this.reserva.startTime).subscribe(mesas => {
      this.mesasDisponibles = mesas; 
      console.log('Mesas disponibles:', this.mesasDisponibles); 
    }, error => {
      console.error('Error al cargar mesas:', error);
    });
  }


  agregarMesa(mesaId: number): void {
    // Verificar si la mesa ya está en la lista
    if (!this.reservationRequest.resTables.some(m => m.id === mesaId)) {
      const mesa = { id: mesaId };
      this.reservationRequest.resTables.push(mesa);
      console.log('Mesa agregada:', mesaId);
    } else {
      console.warn('La mesa ya ha sido agregada');
    }
  }

  enviarReserva(): void {
    
    this.reservationRequest.id = this.reservaId;  // Asigna el ID de la reserva
  
    if (!this.reservationRequest.id) {
      console.error('ID de la reserva no está asignado.');
      return;
    }
    if (this.reservationRequest.resTables.length === 0) {
      alert('Por favor, selecciona al menos una mesa antes de continuar.');
      return; // No continuar con el envío si no hay mesas
  }
    this.reservaservice.agregarmesas(this.reservationRequest).subscribe
    (response => {
      console.log('Reserva enviada', response);
      this.router.navigate(['/reservasion/mesas/menu']);
    }, error => {
      console.error('Error al enviar la reserva:', error);
    });
  }

  mesaYaSeleccionada(mesaId: number): boolean {
    return this.reservationRequest.resTables.some(m => m.id === mesaId);
  }

  limpiarListas(): void {
    this.reservationRequest.resTables = []; // Limpiar la lista de platos seleccionados
    console.log('Listas limpiadas');
  }

}
