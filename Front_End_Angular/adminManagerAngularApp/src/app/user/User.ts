import { Role } from './../role/Role';
export interface User{
    id?: number;
    name?: string;
    secondName?: string;
    birthday?: string;
    email?: string;
    phoneNumber?: string;
    login?: string;
    password?: string;
    role?: Role;
}