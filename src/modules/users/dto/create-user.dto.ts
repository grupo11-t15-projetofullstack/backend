import { Adresses } from "@prisma/client";
import { Exclude } from 'class-transformer';

export class CreateUserDto {
    name: string;
    email: string;
    phone: string;
    addressId: Adresses;
    isSeller: boolean;
    avatar: string;
    description: string;
    cpf: string;
    birth: string;
    @Exclude()
    password: string;
}
