import { Cliente } from "../Cliente/cliente";
import { Orden } from "../Orden/orden";
import { Reservasionmesa } from "../ReservationTable/reservasionmesa";

export class Reserva {
    id:number;
    date:string;
    name:string;
    lastname:string;
    phone:string;
    email:string;
    address:string;
    dni:string;
    startTime: string;
    endTime : string;
    tables: Reservasionmesa[];
    orderDishes: Orden[];
    orderDrinks: Orden[];
    priceTotal:number;
    refoundstatus:boolean;
    status:number;

}
