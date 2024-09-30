export class ReservationRequest {
    id: number;
    resTables: { id: number }[];
  
    constructor() {
      this.resTables = [];
    }
}
