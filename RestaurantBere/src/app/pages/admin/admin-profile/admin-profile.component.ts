import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/Services/auth/auth.service';
import { AdminService } from '../../../core/Services/admin/admin.service';
import { AuthResponse } from '../../../shared/models/auth/auth-response-model';
import { AdminProfile } from '../../../shared/models/admin/admin-response-model';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss'
})
export class AdminProfileComponent {

  userData: AuthResponse | null;
  adminData: AdminProfile;
  private authService = inject(AuthService);
  private adminService = inject(AdminService);

  ngOnInit(): void {
    this.userData = this.authService.getUser();
    if(this.userData?.id !== undefined){
      this.getAdminById(this.userData?.id);
    }
  }

  getAdminById(id: number): void {
    this.adminService.getUserFindId(id).subscribe(
      (admin) => {
        this.adminData = admin;
    });
  }

}
