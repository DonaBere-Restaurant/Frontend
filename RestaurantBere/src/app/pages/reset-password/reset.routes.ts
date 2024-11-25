import { Routes } from '@angular/router'; 
import { ValidateTokenComponent } from '../reset-password/validate-token/validate-token.component';
import { SendEmailComponent } from '../reset-password/send-email/send-email.component';
import { NewPasswordComponent } from '../reset-password/new-password/new-password.component';
import { AdviceComponent } from './advice/advice.component';

export const resetRoutes: Routes = [
    {
        path: "",
        children: [ 
            { path: "sendMail", component: SendEmailComponent },
            { path: 'validate/:token', component: ValidateTokenComponent },
            { path: 'newPass/:token', component: NewPasswordComponent },
            { path: 'advice', component: AdviceComponent}
        ]
    }

];