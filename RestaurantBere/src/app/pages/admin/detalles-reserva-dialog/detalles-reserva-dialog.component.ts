import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AdminReservas } from '../../../shared/models/admin/admin-reservas-model';

@Component({
  selector: 'app-detalles-reserva-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './detalles-reserva-dialog.component.html',
  styleUrl: './detalles-reserva-dialog.component.scss'
})
export class DetallesReservaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DetallesReservaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminReservas
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
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

  getStatusClass(status: number): string {
    switch (status) {
      case 0:
        return 'status-reservado';
      case 2:
        return 'status-cancelado';
      default:
        return 'status-desconocido';
    }
  }
}