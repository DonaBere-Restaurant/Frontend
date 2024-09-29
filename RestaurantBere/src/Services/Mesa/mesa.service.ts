import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesa } from '../../Class/Mesa/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {
  private  urlBd = "http://localhost:8080/api/v1/mesas";

 constructor(private httpClient : HttpClient) { 
  }

  getfreetables(date: string, startTime: string): Observable<Mesa[]> {
    return this.httpClient.get<Mesa[]>(`${this.urlBd}?date=${date}&startTime=${startTime}`); 
  }
  
  
}
