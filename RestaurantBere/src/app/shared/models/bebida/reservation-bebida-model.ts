export class ReservationBebida{
    id: number;
    orderDrinks: { drinkId: number, quantity: number }[];
    
    constructor() {
        this.orderDrinks = [];
    }
}