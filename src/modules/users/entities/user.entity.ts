import { Exclude } from 'class-transformer';
import { Addresses } from 'src/modules/adresses/entities/addresses.entity';

export class User {
  readonly id: number;
  name: string;
  email: string;
  phone: string;
  addressId?: Addresses;
  isSeller: boolean;
  avatar: string;
  description: string;
  cpf: string;
  birth: string;

  @Exclude()
  password: string;
}
