export class ReservationplatoRequest {
    id: number;
    orderDishes: { dishId: number ,quantity:number}[];
  
    constructor() {
      this.orderDishes = [];
    }
}
