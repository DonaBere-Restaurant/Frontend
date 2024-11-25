import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ResenaRequestModel} from "../../../shared/models/Resena/resena-request-model";
import {ResenaResponseModel} from "../../../shared/models/Resena/resena-response-model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResenaService {
  private urlResena = "http://localhost:8080/api/v1/resena";

  constructor(private httpClient: HttpClient) {

  }
  crearReseña(id: number, resena: ResenaRequestModel): Observable<ResenaResponseModel> {
    const url = `${this.urlResena}/crear/${id}`;
    return this.httpClient.post<ResenaResponseModel>(url, resena);
  }

  getAllresenas(): Observable<ResenaResponseModel[]> {
    const url = `${this.urlResena}/all-resenas`;
    return this.httpClient.get<ResenaResponseModel[]>(url);
  }

  getResenaById(id: number): Observable<ResenaResponseModel> {
    const url = `${this.urlResena}/${id}`;
    return this.httpClient.get<ResenaResponseModel>(url);
  }
}
