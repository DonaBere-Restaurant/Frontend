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

export class AdminService {

    private baseUrl = `${environment.baseURL}/user/profile`;
    private baseUrl2 = `${environment.baseURL}/reservasion`;
    private baseUrl3 = `${environment.baseURL}/admin/drink`;
    private baseUrl4 = `${environment.baseURL}`;
    private baseUrl5 = `${environment.baseURL}/pdf`;
    private http = inject(HttpClient);

    constructor() { }

    getUserFindId(id: number): Observable<AdminProfile> {
        return this.http.get<AdminProfile>(`${this.baseUrl}/${id}`);
    }

    getAllReservations(): Observable<AdminReservas[]>{
        return this.http.get<AdminReservas[]>(`${this.baseUrl2}/all-reservations`);
    }
    getPayedReservations(): Observable<Reserva[]>{
        return this.http.get<Reserva[]>(`${this.baseUrl4}/admin/reservations`);
    }
    
    changeRefoundStatus(id: number){
        return this.http.put(`${this.baseUrl4}/admin/refound/${id}`,null);
    }

    getAllDishes(): Observable<Plato[]>{
        return this.http.get<Plato[]>(`${this.baseUrl2}/dia/mesas/menu`);
    }

    createDish(plato: PlatoRequest): Observable<string> {
        const formData = new FormData();
        formData.append('title', plato.title);
        formData.append('description', plato.description);
        formData.append('price', plato.price.toString());
        if (plato.image instanceof File) {
            formData.append('image', plato.image, plato.image.name);
        }

        return this.http.post(`${this.baseUrl4}/admin/menu`, formData, { responseType: 'text' });
    }

    getImageDish(filename: string): Observable<Blob>{
        return this.http.get<Blob>(`${this.baseUrl4}/uploads/${filename}`, { responseType: 'blob' as 'json' });
    }

    deleteDish(id: number): Observable<string> {
        return this.http.delete(`${this.baseUrl4}/admin/menu/${id}`, { responseType: 'text' });
    }

    getUpdateDish(id: number, plato: PlatoRequest): Observable<string> {
        const formData = new FormData();
        formData.append('title', plato.title);
        formData.append('description', plato.description);
        formData.append('price', plato.price.toString());
        if (plato.image instanceof File) {
            formData.append('image', plato.image, plato.image.name);
        }
        return this.http.put(`${this.baseUrl4}/admin/menu/${id}`, formData, { responseType: 'text' });
    }
    
    getAllDrinks(): Observable<Bebidas[]>{
        return this.http.get<Bebidas[]>(`${this.baseUrl3}/all`);
    }

    createDrink(bebida: BebidasRequest): Observable<string> {
        const formData = new FormData();
        formData.append('name', bebida.name);
        formData.append('description', bebida.description);
        formData.append('price', bebida.price.toString());
        if (bebida.image instanceof File) {
            formData.append('image', bebida.image, bebida.image.name);
        }
        return this.http.post(`${this.baseUrl3}/create`, formData, { responseType: 'text' });
    }

    getImageDrink(filename: string): Observable<Blob>{
        return this.http.get<Blob>(`${this.baseUrl3}/uploads/${filename}`, { responseType: 'blob' as 'json' });
    
    }

    deleteDrink(id: number): Observable<string> {
        return this.http.delete(`${this.baseUrl3}/delete/${id}`, { responseType: 'text' });
    }

    getUpdateDrink(id: number, bebida: BebidasRequest): Observable<string> {
        const formData = new FormData();
        formData.append('name', bebida.name);
        formData.append('description', bebida.description);
        formData.append('price', bebida.price.toString());
        if (bebida.image instanceof File) {
            formData.append('image', bebida.image, bebida.image.name);
        }
        return this.http.put(`${this.baseUrl3}/update/${id}`, formData, { responseType: 'text' });
    }

    downloadWeeklyReport(): Observable<Blob> {
        return this.http.get(`${this.baseUrl5}/week`, { responseType: 'blob' });
    }

    downloadMonthlyReport(): Observable<Blob> {
        return this.http.get(`${this.baseUrl5}/month`, { responseType: 'blob' });
    }

    updatePassword(userId:number, passdata: PasswordRequest): Observable<string> {
        return this.http.put(`${this.baseUrl}/edit-password/${userId}`, passdata, { responseType: 'text' });
    }
}
