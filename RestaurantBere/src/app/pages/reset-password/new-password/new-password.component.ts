import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../../../core/Services/reset-password/reset-password.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  passwordForm: FormGroup;
  private resetPasswordService = inject(ResetPasswordService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  token: string | null = null;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      }, { validators: this.passwordsMatch }
    );
  }
  
  passwordsMatch(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  onSubmit() {
    if (this.passwordForm.valid && this.token) {
      const newPassword = this.passwordForm.value.newPassword;
      this.resetPasswordService.resetPassword(this.token, newPassword).subscribe({
        next: () => {
          alert('Contraseña restablecida exitosamente.');
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error('Error al restablecer la contraseña:', err);
          alert('No se pudo restablecer la contraseña. Intente nuevamente.');
        }
      });
    } else {
      alert('Por favor, ingrese una contraseña válida.');
    }
  }
}
