import { PartialType } from '@nestjs/mapped-types';
import { Adresses } from '@prisma/client';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birth: string;
  description: string;
  addressId: Adresses;
}
