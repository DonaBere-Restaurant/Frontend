import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetPasswordService } from '../../../core/Services/reset-password/reset-password.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss'
})
export class SendEmailComponent {
  emailForm: FormGroup;
  private resetPassword = inject(ResetPasswordService);
  private router = inject(Router); 
  private snackBar = inject(MatSnackBar);
  loading: boolean = false;
  

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email; 
      this.loading = true;
  
      this.resetPassword.emailExists(email).subscribe({
        next: (exists: boolean) => {
          if (exists) { 
            
            this.resetPassword.sendPasswordResetMail(email).subscribe({
              next: () => { 
                this.loading = false;
                this.showSnackBar('Correo enviado. Revisa tu bandeja de entrada.', 'success');
                this.router.navigate(['/reset-password/advice']);
              },
              error: (err) => {
                this.loading = false;
                this.handleError(err);
              }
            });
          } else {
            this.loading = false;
            this.showSnackBar('El correo ingresado no está registrado.', 'error');
          }
        },
        error: (err) => {
          this.loading = false;
          this.showSnackBar('Error al verificar el correo. Intente nuevamente.', 'error');
        },
      });
    } else {
      this.showSnackBar('Por favor, ingrese un correo válido.', 'warning');
    }
  }
  
  private handleError(err: any): void {
    console.error('Error al enviar el correo de restablecimiento:', err);

    switch (err.status) {
      case 409: // HttpStatus.CONFLICT
        this.showSnackBar('La contraseña no puede ser igual a la actual.', 'error');
        break;
      case 410: // HttpStatus.GONE
        this.showSnackBar('El token de restablecimiento ha expirado. Solicite uno nuevo.', 'warning');
        break;
      case 500: // HttpStatus.INTERNAL_SERVER_ERROR
        this.showSnackBar('Error en el servidor. Intente más tarde.', 'error');
        break;
      default:
        this.showSnackBar('No se pudo enviar el correo. Intente nuevamente.', 'error');
    }
  }

  private showSnackBar(message: string, type: 'success' | 'error' | 'warning') {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}