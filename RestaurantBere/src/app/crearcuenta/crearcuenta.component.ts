import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearcuenta',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './crearcuenta.component.html',
  styleUrl: './crearcuenta.component.scss'
})
export class CrearcuentaComponent {

  formUser: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router){

    this.formUser = this.fb.group({
      'name': ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      'address': ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      'phone': ['', [Validators.required,Validators.maxLength(9),Validators.minLength(9),Validators.pattern(/^\d{9}$/)]],
      'dni': ['', [Validators.required,Validators.maxLength(8),Validators.minLength(8),Validators.pattern(/^\d{8}$/)]],
      'email': ['',[Validators.required,Validators.email]],
      'password': ['',[Validators.required,Validators.minLength(8)]],
      'passwordConfirm': ['',Validators.required],
      
      'check': ['',Validators.required]
    },
    {
      validators: this.Coincidir('password','passwordConfirm')
    });
  }

  get name(){
    return this.formUser.get('name') as FormControl;
  }

  get address(){
    return this.formUser.get('address') as FormControl;
  }

  get phone(){
    return this.formUser.get('phone') as FormControl;
  }

  get dni(){
    return this.formUser.get('dni') as FormControl;
  }

  get email(){
    return this.formUser.get('email') as FormControl;
  }

  get password(){
    return this.formUser.get('password') as FormControl;
  }

  get passwordConfirm(){
    return this.formUser.get('passwordConfirm') as FormControl;
  }

  get check(){
    return this.formUser.get('check') as FormControl;    
  }

  Coincidir(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if(matchingControl.errors && !matchingControl.errors['Coincidir']){
        return;
      }
      if(control.value !== matchingControl.value){
        matchingControl.setErrors({Coincidir: true});
      }else{
        matchingControl.setErrors(null);
      }
      
    }
  }

  enviar(){
    if (this.formUser.valid) {
      const userData = {
        dni: this.dni.value,
        name: this.name.value,
        phone: this.phone.value,
        email: this.email.value,
        password: this.password.value,
        address: this.address.value,
      };

      console.log('Datos a enviar:', userData); 

      this.userService.createUser(userData).subscribe({
        next: (response) => {
          console.log('Cuenta creada con éxito:', response);
          this.router.navigate(['/inicio']);
        },
        error: (error) => {
          console.error('Error al crear la cuenta:', error);
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }

}
