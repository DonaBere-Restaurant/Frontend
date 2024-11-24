import { RolesInfo } from "./role-info-model";

export interface RegisterCustomerResponse {
    id: number;
    email: string;
    role: RolesInfo;
    name: string;
    dni: string;
    phone: string;
    address: string;
}