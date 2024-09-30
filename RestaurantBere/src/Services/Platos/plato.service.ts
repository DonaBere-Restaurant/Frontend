import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plato } from '../../Class/Plato/plato';
import {ReservationplatoRequest} from '../../Class/Plato/reservationplato-request'
import {HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PlatoService {
  private  urlBd = "https://backend-bdik.onrender.com/api/v1/reservasion/dia/mesas/menu";
  constructor(private httpClient : HttpClient) { 
  }
  getPlatos():Observable<Plato[]>{
    return this.httpClient.get<Plato[]>(`${this.urlBd}`);
  }

  agregarPlatos(reservationplatorequest :ReservationplatoRequest):Observable<ReservationplatoRequest>
  {
    return this.httpClient.post<ReservationplatoRequest>(`${this.urlBd}`, reservationplatorequest).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error del cliente: ${error.error.message}`;
        } else {
          errorMessage = `Error del servidor: ${error.status}, mensaje: ${error.message}`;
        }
        return throwError(() => new Error(errorMessage));
      })
    )
  }
}
