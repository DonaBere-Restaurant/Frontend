import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesa } from '../../../shared/models/Mesa/mesa';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MesaService {


  private  urlBd =`${environment.baseURL}/mesas`;
  //private  urlBd = "http://localhost:8080/api/v1/mesas";


 constructor(private httpClient : HttpClient) {
  }

  getfreetables(date: string, startTime: string): Observable<Mesa[]> {
    return this.httpClient.get<Mesa[]>(`${this.urlBd}?date=${date}&startTime=${startTime}`);
  }


}
