import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-crearcuenta',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './crearcuenta.component.html',
  styleUrl: './crearcuenta.component.scss'
})
export class CrearcuentaComponent {

  formUser: FormGroup;

  constructor(private fb: FormBuilder){

    this.formUser = this.fb.group({
      'name': ['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
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
    console.log(this.formUser.value);
  }

}
