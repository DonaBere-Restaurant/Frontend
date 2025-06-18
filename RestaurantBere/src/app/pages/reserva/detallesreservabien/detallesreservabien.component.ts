import { Component } from '@angular/core';
import { ReservaService } from '../../../core/Services/Reserva/reserva.service';

@Component({
  selector: 'app-detallesreservabien',
  standalone: true,
  imports: [],
  templateUrl: './detallesreservabien.component.html',
  styleUrl: './detallesreservabien.component.scss'
})
export class DetallesreservabienComponent {
  constructor(
    private reservaService: ReservaService
  ) {}

  downloadReservationPdf() {
    this.reservaService.downloadPdf().subscribe({
      next: (blob) => this.downloadFile(blob, "reserva.pdf")
    });
  }

  private downloadFile(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
