import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plato } from '../../../shared/models/Plato/plato';
import {ReservationplatoRequest} from '../../../shared/models/Plato/reservationplato-request';
import {HttpErrorResponse} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class PlatoService {


   //private urlBd = "https://backend-bdik.onrender.com/api/v1/reservasion/dia/mesas/menu" ;

   private urlBd =  `${environment.baseURL}/reservasion/dia/mesas/menu ` ;


  private urlBd = "http://localhost:8080/api/v1/reservasion/dia/mesas/menu";
  //private urlImagen = "https://backend-bdik.onrender.com/api/v1";


    private urlImagen = `${environment.baseURL}`;

  // private urlImagen = "http://localhost:8080/api/v1";



  constructor(private httpClient : HttpClient) {
  }

  getPlatos():Observable<Plato[]>{
    return this.httpClient.get<Plato[]>(`${this.urlBd}`);
  }

  agregarPlatos(reservationplatorequest :ReservationplatoRequest):Observable<ReservationplatoRequest>{
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

  cargarImagen(filename: string):Observable<Blob>{
    return this.httpClient.get<Blob>(`${this.urlImagen}/uploads/${filename}`, { responseType: 'blob' as 'json' });
  }

}
