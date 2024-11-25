import { Component } from '@angular/core';
import { AdminService } from '../../../core/Services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-informe',
  standalone: true,
  imports: [],
  templateUrl: './admin-informe.component.html',
  styleUrl: './admin-informe.component.scss'
})
export class AdminInformeComponent {
  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {}
  
  downloadWeeklyReport() {
    this.adminService.downloadWeeklyReport().subscribe({
      next: (blob) => this.downloadFile(blob, "reporte_semanal.pdf"),
      error: (error) => this.handleError(error, "reporte semanal")
    });
  }

  downloadMonthlyReport() {
    this.adminService.downloadMonthlyReport().subscribe({
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

