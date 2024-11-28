import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AdminProfile } from "../../../shared/models/admin/admin-response-model";
import { AdminReservas } from "../../../shared/models/admin/admin-reservas-model";
import { Plato } from "../../../shared/models/admin/admin-platos-response-model";
import { Bebidas } from "../../../shared/models/admin/admin-bebidas-response-model";
import { PlatoRequest } from "../../../shared/models/admin/admin-platos-request-model";
import { BebidasRequest } from "../../../shared/models/admin/admin-bebidas-request-model";
import { PasswordRequest } from "../../../shared/models/admin/admin-password-request-model";
import { Reserva } from "../../../shared/models/Reserva/reserva";
@Injectable({
    providedIn: "root"  
})

export class ReportService {

    private baseUrl5 = `${environment.baseURL}/api/v1/pdf`;
    private http = inject(HttpClient);

    constructor() { }

    downloadWeeklyReport(): Observable<Blob> {
        return this.http.get(`${this.baseUrl5}/week`, { responseType: 'blob' });
    }

    downloadMonthlyReport(): Observable<Blob> {
        return this.http.get(`${this.baseUrl5}/month`, { responseType: 'blob' });
    }

}
