import { Injectable } from '@angular/core';
import { AuthResponse } from '../../shared/models/auth/auth-response-model';
import {CustomReservationResponseDTO} from "../../shared/models/Reserva/CustomReservationResponseDTO";
import {ResenaResponseModel} from "../../shared/models/Resena/resena-response-model";


@Injectable({
    providedIn: 'root'
  })

export class StorageService {
    private authKey="restaurantBere_auth";

    setAuthData(data:AuthResponse):void {
        localStorage.setItem(this.authKey,JSON.stringify(data))
    }

    getAuthData(): AuthResponse | null{
        const data = localStorage.getItem(this.authKey);
        return data ? JSON.parse(data) as AuthResponse : null;
    }

    clearAuthData():void {
        localStorage.removeItem(this.authKey);
    }

  setResenaData(data: ResenaResponseModel):void {
    localStorage.setItem(this.authKey,JSON.stringify(data))
  }

  getResenaData(): ResenaResponseModel | null{
    const data = localStorage.getItem(this.authKey);
    return data ? JSON.parse(data) as ResenaResponseModel : null;
  }

}
