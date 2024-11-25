import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/Services/auth/auth.service';
import { AdminService } from '../../../core/Services/admin/admin.service';
import { AuthResponse } from '../../../shared/models/auth/auth-response-model';
import { AdminProfile } from '../../../shared/models/admin/admin-response-model';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss'
})
export class AdminProfileComponent {

  userData: AuthResponse | null;
  adminData: AdminProfile;
  passwordForm: FormGroup;
  private authService = inject(AuthService);
  private adminService = inject(AdminService);
  private fb = inject(FormBuilder);
  private snackbar = inject(MatSnackBar);


  constructor() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    },
  {
    validators: this.passwordMatchValidator
  });
  }


  ngOnInit(): void {
    this.userData = this.authService.getUser();
    if(this.userData?.id !== undefined){
      this.getAdminById(this.userData?.id);
    }
  }

  getAdminById(id: number): void {
    this.adminService.getUserFindId(id).subscribe(
      (admin) => {
        this.adminData = admin;
    });
  }

  updatePassword() {
    if(this.passwordForm.valid){
      const passwordData = this.passwordForm.value;
      this.adminService.updatePassword(this.adminData.id, passwordData).subscribe(
        () => {
          this.passwordForm.reset();
          this.showSnackBar('Contraseña actualizada correctamente');
          console.log('Contraseña actualizada correctamente');
        },
        (error) => {
          console.error('Error al actualizar contraseña:', error);
        }
      );
    } else {
      console.error('Formulario de contraseña incompleto');
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword?.setErrors(null);
      return null;
    }
  }

  private showSnackBar(message:string) : void{
    this.snackbar.open(message,'Close',{
      duration : 2000,
      verticalPosition : 'top'
    });
  }
}
