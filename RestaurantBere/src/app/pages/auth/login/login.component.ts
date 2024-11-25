import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaviniciarsesionComponent } from "../../../shared/components/naviniciarsesion/naviniciarsesion.component";
import {FormBuilder, FormGroup, FormsModule,ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../../core/Services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule, NaviniciarsesionComponent, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private authService = inject(AuthService);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: () => {
          console.log('Inicio de sesión exitoso');
          this.router.navigate(['/inicio']);
          this.showSnackBar('Inicio de sesión exitoso');
        },
        error: (error) => {
          this.showSnackBar('Error al iniciar sesión');
        }
      }
      );
    } else {
      this.showSnackBar('Por favor, complete los campos correctamente');
    }
  }
  private showSnackBar(message:string) : void{
    this.snackbar.open(message,'Close',{
      duration : 2000,
      verticalPosition : 'top'
    });
  }
}
