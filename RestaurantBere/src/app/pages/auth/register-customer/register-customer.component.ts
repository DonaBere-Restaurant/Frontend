import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavcrearcuentaComponent } from "../../../shared/components/navcrearcuenta/navcrearcuenta.component";
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/Services/auth/auth.service';

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
  private authService = inject(AuthService);

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
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
      console.log('Enviando formulario:', userData);
      this.authService.registerCustomer(userData).subscribe({
        next: () => {
          console.log('Cliente registrado correctamente');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error al registrar cliente:', error);
        }
      });
    } else {
      console.error('Formulario invalido:', this.registerForm.errors);
    }
  }

}
