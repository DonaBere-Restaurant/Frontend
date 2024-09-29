
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../../Class/Reserva/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private  urlBd = "http://localhost:8080/api/v1/reservasion/dia";
  constructor(private httpClient : HttpClient) 
  { 


  }

  crearReservasion(reserva:Reserva): Observable<Object>{
    return this.httpClient.post(`${this.urlBd}`,reserva);
  }
}
