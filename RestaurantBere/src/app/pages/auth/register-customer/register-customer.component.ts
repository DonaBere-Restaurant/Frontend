import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavcrearcuentaComponent } from "../../../shared/components/navcrearcuenta/navcrearcuenta.component";
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/Services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-customer',
  standalone: true,
  imports: [NavcrearcuentaComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register-customer.component.html',
  styleUrl: './register-customer.component.scss'
})
export class RegisterCustomerComponent {

  registerForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar); 
  private authService = inject(AuthService);

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]], 
      phone: ['', [Validators.required,Validators.maxLength(9), Validators.minLength(9),Validators.pattern('^[0-9]*$')]],
      address: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  onSubmit(){
    if(this.registerForm.valid){
      const userData = this.registerForm.value;
      this.authService.registerCustomer(userData).subscribe({
        next: () => {
          console.log('Cliente registrado correctamente');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log("hola soy un error ",error.error.error);
          this.showSnackBar(error?.error?.error);
        }
      });
    } else {
      console.error('Formulario invalido:', this.registerForm.errors);
    }
  }

  private showSnackBar(message: string): void {
    this.snackbar.open(message, 'Cerrar', {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}
