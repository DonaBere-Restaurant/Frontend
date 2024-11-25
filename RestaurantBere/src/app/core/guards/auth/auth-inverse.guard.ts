import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/auth/auth.service';
import { inject } from '@angular/core';

export const authInverseGuard: CanActivateFn = (route, state) =>{
    const authService = inject(AuthService);
    const router = inject(Router);
    
    if(authService.isAuthenticated()){
        const userRole = authService.getUser();
        if (userRole?.role == 'ROLE_CUSTOMER'){
            router.navigate(['/customer/miperfil']);
        }
        if (userRole?.role == 'ROLE_ADMIN'){
            router.navigate(['/admin/perfil']);
        }
        return false;
    }
    return true;
};

