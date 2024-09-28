import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl,Validators, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-iniciarsesion',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './iniciarsesion.component.html',
  styleUrl: './iniciarsesion.component.scss'
})
export class IniciarsesionComponent {

  formUser: FormGroup;

  constructor( private formBuilder: FormBuilder){
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

  login(){
    if(this.formUser.valid){
      console.log("Llamar aqui al servicio de login");
      //this.router.navigateByUrl('/inicio')
    }
  }

}
