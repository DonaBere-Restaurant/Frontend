import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminReservas } from '../../../shared/models/admin/admin-reservas-model';
import { AdminService } from '../../../core/Services/admin/admin.service';
import { DetallesReservaDialogComponent } from '../detalles-reserva-dialog/detalles-reserva-dialog.component';
import { Reserva } from '../../../shared/models/Reserva/reserva';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-admin-reservas',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './admin-reservas.component.html',
  styleUrl: './admin-reservas.component.scss'
})
export class AdminReservasComponent {

  reservas: Reserva[];
  private adminService = inject(AdminService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackbar = inject(MatSnackBar);
  isLoading: boolean = true; 
  public reservaId :number;
  ngOnInit(): void {
    this.reservasAll();
  }

  reservasAll() {
    this.isLoading = true;
    this.adminService.getPayedReservations().subscribe(
      (reservas) => {
        this.reservas = reservas.map(reserva => {
          const estadoGuardado = localStorage.getItem(`reserva_${reserva.id}`);
          if (estadoGuardado) {
            reserva.status = parseInt(estadoGuardado, 10);
          }
          return reserva;
          
        });
        this.isLoading = false;
      },

      (error) => {
        console.error('Error al cargar las reservas', error);
        this.isLoading = false; 
      }
    );
  }
  
  getEstadoReserva(estado: number): string {
    switch (estado) {
      case 2:
        return 'Cancelado';
      default:
        return 'Reservado';
    }
  }
  getEstadoRembolso(estado:boolean,cancelado: number)
  {
    if(cancelado==0)
    {
      return "-";
    }
    else{
      if(estado)
        {
          return 'Rembolsado';
        }
    
        else
        {
          return 'Pendiente';
        }
    }

  }
  marcarRembolso(reservaId: number)
  { this.reservaId=reservaId;
    
  }

  Confirmarrembolso(id :number)
  {
    this.adminService.changeRefoundStatus(id).subscribe(
      (next)=>
      {
        this.showSnackBar("Reserva marcada como rembolsada");
        this.reservasAll()
      },
      (error)=>
      {
        this.showSnackBar(error.error.error);
      }
    );
  }
  cambiarEstadoReserva(reserva: AdminReservas) {
    if (reserva.status === 0) {
      reserva.status = 2;
      localStorage.setItem(`reserva_${reserva.id}`, reserva.status.toString());
      console.log(`Reserva ${reserva.id} cancelada`);
    }
  }

  verDetalles(reserva: Reserva) {
    this.dialog.open(DetallesReservaDialogComponent, {
      width: '400px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: reserva,
      panelClass: ['custom-dialog-container'],
    });
  }
    private showSnackBar(message:string) : void{
    this.snackbar.open(message,'Close',{
      duration : 2000,
      verticalPosition : 'top'
    });
  }
}
