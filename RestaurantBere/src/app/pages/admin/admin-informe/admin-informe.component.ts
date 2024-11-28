import { Component } from '@angular/core';
import { AdminService } from '../../../core/Services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ReportService } from '../../../core/Services/report/report.service';

@Component({
  selector: 'app-admin-informe',
  standalone: true,
  imports: [],
  templateUrl: './admin-informe.component.html',
  styleUrl: './admin-informe.component.scss'
})
export class AdminInformeComponent {
  constructor(
    private reportService: ReportService,
    private snackBar: MatSnackBar
  ) {}
  
  downloadWeeklyReport() {
    this.reportService.downloadWeeklyReport().subscribe({
        next: (blob) => {
            if (blob.type !== 'application/pdf') {
                console.error('Respuesta no válida:', blob);
            } else {
                this.downloadFile(blob, 'reporte_semanal.pdf');
            }
        },
        error: (error) => console.error('Error en la descarga:', error)
    });
}
  downloadMonthlyReport() {
    this.reportService.downloadMonthlyReport().subscribe({
      next: (blob) => this.downloadFile(blob, "reporte_mensual.pdf"),
      error: (error) => this.handleError(error, "reporte mensual")
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

  private handleError(error: HttpErrorResponse, reportType: string) {
    this.showSnackBar(`No hay suficientes datos. Por favor, intente nuevamente más tarde.`);
  console.error(`Error al generar el ${reportType}:`, error);
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, "Cerrar", {
      duration: 5000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }
}

