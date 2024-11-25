import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Bebida } from "../../../shared/models/bebida/bebida-model";
import { ReservationBebida } from "../../../shared/models/bebida/reservation-bebida-model";

@Injectable({
    providedIn: "root"  
})

export class DrinkService{

    private baseUrl = `${environment.baseURL}/admin/drink`;
    private baseUrl2 = `${environment.baseURL}/reservasion/dia/mesas/menu/bebidas`;
    private http = inject(HttpClient);

    constructor() { }

    getAllDrinks(): Observable<Bebida[]> {
        return this.http.get<Bebida[]>(`${this.baseUrl}/all`);
    }

    agregarBebida(reservationBebidaRequest: ReservationBebida): Observable<ReservationBebida> {
        return this.http.post<ReservationBebida>(`${this.baseUrl2}`, reservationBebidaRequest);
    }

    cargarImagen(filename: string): Observable<Blob> {
        return this.http.get<Blob>(`${this.baseUrl}/uploads/${filename}`, { responseType: 'blob' as 'json' });
    }

}