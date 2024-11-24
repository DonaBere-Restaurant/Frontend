import { Component, inject, Input} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/Services/auth/auth.service';

@Component({
  selector: 'app-navegador',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navegador.component.html',
  styleUrl: './navegador.component.scss'
})
export class NavegadorComponent {

  isLoggedIn: boolean = false;
  private router = inject(Router);
  private authService = inject(AuthService)

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
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

}
