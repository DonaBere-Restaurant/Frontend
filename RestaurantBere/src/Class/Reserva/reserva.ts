import { Cliente } from "../Cliente/cliente";
import { Orden } from "../Orden/orden";
import { Reservasionmesa } from "../ReservationTable/reservasionmesa";

export class Reserva {
    id:number;
    date:string;
    customer : Cliente;
    startTime: string;
    endTime : string;
    tables: Reservasionmesa[];
    orderDishes: Orden[];
    priceTotal:number;

}
