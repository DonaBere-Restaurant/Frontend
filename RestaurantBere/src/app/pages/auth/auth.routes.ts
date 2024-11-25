import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { SendEmailComponent } from '../reset-password/send-email/send-email.component';

export const authRoutes: Routes = [
    {
        path: "",
        component: AuthLayoutComponent,
        children: [
            { path: 'sendMail', component: SendEmailComponent },
            { path: "login", component: LoginComponent },
            { path: "register", component: RegisterCustomerComponent }
        ]
    }

];