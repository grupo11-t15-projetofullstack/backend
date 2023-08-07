import { Adresses } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class User {
    readonly id: number;
    name: string;
    email: string;
    phone: string;
    addressId?: Adresses[];
    isSeller: boolean;
    avatar: string;
    description: string;
    cpf: string;
    birth: string;
    password: string;
}
