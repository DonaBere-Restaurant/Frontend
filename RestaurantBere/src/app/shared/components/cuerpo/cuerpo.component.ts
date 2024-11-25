import { Component, OnInit, inject } from '@angular/core';
import { ResenaService } from '../../../core/Services/resena/resena.service';
import { ResenaResponseModel } from '../../../shared/models/Resena/resena-response-model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cuerpo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.scss']
})
export class CuerpoComponent implements OnInit {
  resenas: ResenaResponseModel[] = [];
  private resenaService = inject(ResenaService);

  ngOnInit() {
    console.log('Obteniendo reseñas');
    this.loadResenas();
  }

  loadMoreResenas() {
    // Implementar lógica para cargar más reseñas
    // Por ejemplo, puedes hacer otra llamada al servicio para obtener más reseñas
  }

  loadResenas() {
    this.resenaService.getAllresenas().subscribe(
      (data: ResenaResponseModel[]) => {
        console.log('Reseñas obtenidas:', data); // Agrega este console.log para verificar los datos
        this.resenas = data;
      },
      (error) => {
        console.error('Error fetching resenas', error);
      }
    );
  }
}