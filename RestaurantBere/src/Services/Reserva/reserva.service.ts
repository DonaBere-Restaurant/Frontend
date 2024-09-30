
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../../Class/Reserva/reserva';
import {HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {ReservationRequest} from '../../Class/ReservationTable/reservation-request';
import{Cliente} from '../../Class/Cliente/cliente'
@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private  urlBd = "http://localhost:8080/api/v1/reservasion";
  private urlUser= "http://localhost:8080/api/v1/auth";

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
    
 actualizarDatosReserva(reserva: Reserva): Observable<Reserva> {
  return this.httpClient.post<Reserva>(`${this.urlBd}/dia/mesas/menu/datos`, reserva).pipe(
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

  createAccount(cliente: Cliente): Observable<number> {
    return this.httpClient.post<number>(`${this.urlUser}/register`, cliente, { responseType: 'text' as 'json' }).pipe(
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

    pagarReserva(reservaId: number): Observable<{ approvalUrl: string }> {
      return this.httpClient.get<{ approvalUrl: string }>(`${this.urlBd}/dia/mesas/menu/datos/pay-reservation/${reservaId}`).pipe(
          catchError((error: HttpErrorResponse) => {
              let errorMessage = 'Ocurrió un error al procesar el pago';
              if (error.status === 400) {
                  errorMessage = error.error.message; // Asigna el mensaje de error devuelto
              } else if (error.error instanceof ErrorEvent) {
                  errorMessage = `Error: ${error.error.message}`;
              } else {
                  errorMessage = `Error: ${error.error.message || 'Ocurrió un error en el servidor'}`;
              }
              console.error('Detalles del error:', error); // Muestra detalles del error en la consola
              alert(errorMessage); // Notifica al usuario sobre el error
              return throwError(() => new Error(errorMessage));
          })
      );
  }
// Método para manejar errores
private handleError(error: HttpErrorResponse) {
  let errorMessage = 'Ocurrió un error';
  if (error.error instanceof ErrorEvent) {
    errorMessage = `Error: ${error.error.message}`;
  } else {
    errorMessage = `Error: ${error.error.message || 'Ocurrió un error en el servidor'}`;
  }
  return throwError(() => new Error(errorMessage));
}
 
// Método para manejar el éxito del pago
handlePaymentSuccess(token: string): Observable<string> {
  return this.httpClient.get<string>(`${this.urlBd}/pay-reservation/success?token=${token}`).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error al procesar el éxito del pago';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error: ${error.error.message || 'Ocurrió un error en el servidor'}`;
      }
      console.error('Detalles del error:', error); // Muestra detalles del error en la consola
      alert(errorMessage); // Notifica al usuario sobre el error
      return throwError(() => new Error(errorMessage));
    })
  );
}
}

