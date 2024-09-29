
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../../Class/Reserva/reserva';
import {HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {ReservationRequest} from '../../Class/ReservationTable/reservation-request';
@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private  urlBd = "http://localhost:8080/api/v1/reservasion";
  constructor(private httpClient : HttpClient) 
  { 

   
  }

  crearReservasion(reserva: Reserva): Observable<Reserva> {
    return this.httpClient.post<Reserva>(`${this.urlBd}/dia`, reserva).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error: ${error.error.message || 'Ocurrió un error en el servidor'}`;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  agregarmesas(reservationRequest:ReservationRequest):Observable<ReservationRequest>
  { 
    return this.httpClient.post<ReservationRequest>(`${this.urlBd}/dia/mesas`, reservationRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error';
        if(error.error instanceof ErrorEvent){
          errorMessage = `Error: ${error.error.message}`;
        }
        else {
          errorMessage = `Error: ${error.error.message || 'Ocurrió un error en el servidor'}`;
        }
        return throwError(() => new Error(errorMessage));
      } )
    );
  }

 obtenerReservasion(id: number): Observable<Reserva> {
  return this.httpClient.get<Reserva>(`${this.urlBd}/${id}`).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error al obtener la reserva';
      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        errorMessage = `Error: ${error.error.message || 'Ocurrió un error en el servidor'}`;
      }
      return throwError(() => new Error(errorMessage));
    })
  );
}

}
