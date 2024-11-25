import { AdminTable } from "./admin-tables-model";

export interface AdminReservas{
    id: number;
    date: string;
    startTime: string;
    endTime: string;
    tables: AdminTable[];
    guestNumber: number;
    priceTotal: number;
    status: number;
    name: string;

}