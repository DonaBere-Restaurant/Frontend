import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminReservas } from '../../../shared/models/admin/admin-reservas-model';
import { AdminService } from '../../../core/Services/admin/admin.service';
import { DetallesReservaDialogComponent } from '../detalles-reserva-dialog/detalles-reserva-dialog.component';

@Component({
  selector: 'app-admin-reservas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reservas.component.html',
  styleUrl: './admin-reservas.component.scss'
})
export class AdminReservasComponent {

  reservas: AdminReservas[];
  private adminService = inject(AdminService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.reservasAll();
  }

  reservasAll() {
    this.adminService.getAllReservations().subscribe(
      (reservas) => {
        this.reservas = reservas.map(reserva => {
          const estadoGuardado = localStorage.getItem(`reserva_${reserva.id}`);
          if (estadoGuardado) {
            reserva.status = parseInt(estadoGuardado, 10);
          }
          return reserva;
        });
      }
    );
  }
  
  getEstadoReserva(estado: number): string {
    switch (estado) {
      case 0:
        return 'Reservado';
      case 2:
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  }

  cambiarEstadoReserva(reserva: AdminReservas) {
    if (reserva.status === 0) {
      reserva.status = 2;
      localStorage.setItem(`reserva_${reserva.id}`, reserva.status.toString());
      console.log(`Reserva ${reserva.id} cancelada`);
    }
  }

  verDetalles(reserva: AdminReservas) {
    this.dialog.open(DetallesReservaDialogComponent, {
      width: '400px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: reserva,
      panelClass: ['custom-dialog-container'],
    });
  }
  
}
