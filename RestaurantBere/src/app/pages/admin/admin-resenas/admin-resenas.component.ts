import { Component, OnInit,inject } from '@angular/core';
import { ResenaService } from '../../../core/Services/resena/resena.service';
import { ResenaResponseModel } from '../../../shared/models/Resena/resena-response-model';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-admin-resenas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-resenas.component.html',
  styleUrl: './admin-resenas.component.scss'
})
export class AdminResenasComponent implements OnInit{
  reseanas: ResenaResponseModel[] = [];
  selectedResena: ResenaResponseModel | null = null;

  private resenaService = inject(ResenaService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    console.log('Obteniendo reseñas');
    this.loadResenas();
  }

  loadResenas() {
    this.resenaService.getAllresenas().subscribe(
      (data: ResenaResponseModel[]) => {
        console.log('Reseñas obtenidas:', data);
        this.reseanas = data;
      },
      (error) => {
        console.error('Error al obtener las reseñas:', error);
      }
    );
  }

  showDetails(resena: ResenaResponseModel) {
    console.log('Mostrando detalles de la reseña:', resena);
    this.selectedResena = resena;
  }

  deleteResena(resenaId: number) {
    console.log('Eliminando reseña con ID:', resenaId);
    this.resenaService.eliminarResena(resenaId).subscribe(
      () => {
        // Actualizar la lista después de eliminar
        this.loadResenas();
        this.snackBar.open('Se ha eliminado la reseña correctamente', 'Cerrar', {
          duration: 3000, // Duración de la notificación en milisegundos
        });
      },
      (error) => {
        this.loadResenas();
        this.snackBar.open('Se ha eliminado la reseña correctamente', 'Cerrar', {
          duration: 3000, // Duración de la notificación en milisegundos
        });
        console.error('Error al eliminar la reseña:', error);
      }
    );
  }
}
