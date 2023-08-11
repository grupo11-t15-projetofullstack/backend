import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Adresses } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birth: string;
  description: string;
  addressId: Adresses;
}
