import { Component, Input, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl,Validators, FormBuilder, FormGroup} from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { NavegadorComponent } from "../navegador/navegador.component";
import { LoginService } from '../../Services/LoginService';
import { NaviniciarsesionComponent } from "../naviniciarsesion/naviniciarsesion.component";

@Component({
  selector: 'app-iniciarsesion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavegadorComponent, NaviniciarsesionComponent],
  templateUrl: './iniciarsesion.component.html',
  styleUrl: './iniciarsesion.component.scss'
})
export class IniciarsesionComponent {

  formUser: FormGroup;

  constructor( private formBuilder: FormBuilder, private router: Router, private userService: UserService, private loginService: LoginService){

    this.formUser = this.formBuilder.group({
      'email': ['',[Validators.required,Validators.email]],
      'password': ['',[Validators.required,Validators.minLength(8)]]
    })
  }
  
  get email(){
    return this.formUser.get('email') as FormControl;
  }

  get password(){
    return this.formUser.get('password') as FormControl;
  }


  login(email: string, password: string ){
    this.loginService.login(email,password)
  }
  

  enviar(){
    if(this.formUser.valid){
      const userData = { 
        email: this.email.value,
        password: this.password.value
      };
      console.log('Datos a enviar:', userData); 
      this.userService.Onlogin(userData).subscribe({
        next: (response: any) => {
          console.log('Inicio exitoso:', response);
          this.router.navigate(['/inicio']);
        },
        error: (error) => {
          console.error('Error al iniciar:', error);
          alert('Credenciales incorrectas.');
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }

}
