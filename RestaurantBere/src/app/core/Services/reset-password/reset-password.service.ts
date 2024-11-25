import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private baseUrl = `${environment.baseURL}/mail`;
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  constructor() { }

  emailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseURL}/validation?email=${email}`);
  }

  sendPasswordResetMail(email: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/sendMail`, email);
  }

  checkTokenValidity(token: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/reset/check/${token}`);
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/reset/${token}`, newPassword);
  }
}
