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

export interface Roles {
    creationDate: string;
    roleDescription: string;
    roleName: string;
    rolesId: number;
};

export interface CustomerRegister {
    email: string;
    fullName: string;
    identificationId: number;
    lastName: string;
    password: string;
    roleName: string;
};