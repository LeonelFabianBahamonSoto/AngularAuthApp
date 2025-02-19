import { Roles } from "./roles.interface";

export interface AuthCustomer {
    email: string,
    password: string,
};

export interface Customer {
    creationDate: string,
    customerId: number,
    email: string,
    fullName: string,
    identificationId: number,
    lastName: string,
    roles: Array<Roles>,
    updateDate: string,
};

export interface CustomerRegister {
    email: string;
    fullName: string;
    identificationId: number;
    lastName: string;
    password: string;
    roleName: string;
};