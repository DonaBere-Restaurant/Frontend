import { Component, inject, Input} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/Services/auth/auth.service';
import { AuthResponse } from '../../models/auth/auth-response-model';

@Component({
  selector: 'app-navegador',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navegador.component.html',
  styleUrl: './navegador.component.scss'
})
export class NavegadorComponent {

  isLoggedIn: boolean = false;
  userData: AuthResponse | null;
  private router = inject(Router);
  private authService = inject(AuthService)

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.userData = this.authService.getUser();
  }

  navigateToCreateAcc() {
    this.router.navigate(['/auth/register']);
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  logout(){
     this.authService.logout();
     this.isLoggedIn = false;
     console.log('Logged out');
     this.router.navigate(['/auth/login']);
  }


  reservar()
  {
    console.log(this.authService.isAuthenticated());
    if(this.authService.isAuthenticated()==false)
    {
      
      this.router.navigate(['/auth/login']);
    }
    else
    {
      this.router.navigate(['/inicio/reservacion']);
    }
  }

  navigateToProfile() {
    if(this.userData?.role === 'ROLE_CUSTOMER'){
      this.router.navigate(['/customer/miperfil']);
    }
    if(this.userData?.role === 'ROLE_ADMIN'){
      this.router.navigate(['/admin/miperfil']);
    }
  }

}
