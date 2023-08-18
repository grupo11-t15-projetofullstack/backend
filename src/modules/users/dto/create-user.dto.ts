import { Adresses } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  addressId: Adresses;

  @IsBoolean()
  @Transform(({ obj, key }) => obj[key] === 'true')
  isSeller: boolean;

  @IsString()
  avatar: string;

  @IsString()
  description: string;

  @IsString()
  cpf: string;

  @IsString()
  birth: string;

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;
}
