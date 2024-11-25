import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { PasswordRequest } from "../../../shared/models/admin/admin-password-request-model";
import { CustomerProfile } from "../../../shared/models/customer/customer-profile-model";

@Injectable({
    providedIn: "root"  
})

export class CustomerService {

    private baseUrl = `${environment.baseURL}/user/profile`;
    private http = inject(HttpClient);

    constructor() { }

    updatePassword(userId:number, passdata: PasswordRequest): Observable<string> {
        return this.http.put(`${this.baseUrl}/edit-password/${userId}`, passdata, { responseType: 'text' });
    }

    getCustomerProfile(userId: number): Observable<CustomerProfile> {
        return this.http.get<CustomerProfile>(`${this.baseUrl}/${userId}`);
    }
}