//Neccesary components to make the login and permissions
/*
import { Login } from './login';
import { Role } from './role';
import { Permission } from './permission';
*/

export class Owner {
    id: number;
    name: string;
    lastname: string;
    password: string;
    email: string;
    roles: string [] = [];
}