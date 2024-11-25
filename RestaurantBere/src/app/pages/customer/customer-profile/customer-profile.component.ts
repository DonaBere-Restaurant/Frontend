import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/Services/auth/auth.service';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';
import { CustomerProfile } from '../../../shared/models/customer/customer-profile-model';
import { AuthResponse } from '../../../shared/models/auth/auth-response-model';
import { CustomerService } from '../../../core/Services/customer/customer.service';
@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [ FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent {

  userData: AuthResponse | null;
  customerProfile: CustomerProfile;
  passwordForm: FormGroup;

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private customerService = inject(CustomerService);
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
      this.getCustomerById(this.userData?.id);
    }
  }

  getCustomerById(id: number): void {
    this.customerService.getCustomerProfile(id).subscribe(
      customerProfile => {
      this.customerProfile = customerProfile;
      console.log('Customer profile obtenido:', this.customerProfile);
    }, error => {
      console.error('Error al obtener el customer profile:', error);
    });
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

  updatePassword() {
    if(this.passwordForm.valid){
      const passwordData = this.passwordForm.value;
      this.customerService.updatePassword(this.customerProfile.id, passwordData).subscribe(
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

  private showSnackBar(message:string) : void{
    this.snackbar.open(message,'Close',{
      duration : 2000,
      verticalPosition : 'top'
    });
  }
}
