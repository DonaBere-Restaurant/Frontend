import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {ReservaService} from '../../Services/Reserva/reserva.service';
import { ActivatedRoute } from '@angular/router';
import {ReservaDataService} from '../../Services/Reserva/reserva-data-service'
import { Reserva } from '../../Class/Reserva/reserva';
import { Cliente } from '../../Class/Cliente/cliente';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-completardatos',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './completardatos.component.html',
  styleUrl: './completardatos.component.scss'
})
export class CompletardatosComponent {
  reserva: Reserva = new Reserva(); 
  reservaId: number;
  cliente: Cliente = new Cliente();

  constructor(private router: Router, private reservaservice: ReservaService,
              private route: ActivatedRoute, private reservaDataService: ReservaDataService) {}

  navigateToHome() {
    this.router.navigate(['/inicio']);
  }
  
  ngOnInit() {
    this.obtenerReserva(); // Llama a obtenerReserva al inicializar
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

  getReservaById(id: number): void {
    this.reservaservice.obtenerReservasion(id).subscribe(reserva => {
      this.reserva = reserva;  // Asignar la reserva obtenida
      console.log('Reserva obtenida:', this.reserva);
    }, error => {
      console.error('Error al obtener la reserva:', error);
    });
  }

  CompletarDatos(clienteId: number) {
    // Verificar que los datos de la reserva y del cliente existan
    if (this.reserva) {
        // Asignar el ID del cliente a la reserva
        this.reserva.customer = {
            id: clienteId,
            dni: this.cliente.dni,
            name: this.cliente.name,
            phone: this.cliente.phone,
            email: this.cliente.email,
            address: this.cliente.address
        };

        this.reservaservice.actualizarDatosReserva(this.reserva).subscribe(
            (dato: Reserva) => {
                console.log('Reserva actualizada con los datos del cliente:', dato);
                this.router.navigate(['reservasion/mesas/menu/datos/resumen']);
            },
            error => {
                console.error('Error al enviar la reserva:', error);
            }
        );
    } else {
        console.error('Datos de la reserva o del cliente no están completos');
    }
}
onSubmit(form: NgForm, event: Event) {
  event.preventDefault();  
  // Capturar los datos del formulario
  this.cliente.dni = form.value.dni;
  this.cliente.name = form.value.name;
  this.cliente.phone = form.value.phone;
  this.cliente.email = form.value.email;
  this.cliente.address = form.value.address;

  console.log('Datos del cliente:', this.cliente);
  
  // Crear el cliente en el backend
  this.reservaservice.createAccount(this.cliente).subscribe(
      response => {
          console.log('Cliente creado con ID:', response);
          // Llamar a CompletarDatos pasando el ID del cliente
          this.CompletarDatos(response); // Asumiendo que `response` es el ID del cliente
      },
      error => {
          console.error('Error al registrar el cliente:', error);
      }
  );
}

}
