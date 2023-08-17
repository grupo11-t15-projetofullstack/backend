import { hashSync } from 'bcrypt';
import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { CreateAddressesDto } from 'src/modules/adresses/dto/create-addresses.dto';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @ValidateNested({ each: true })
  @Type(() => CreateAddressesDto)
  addressId: CreateAddressesDto;

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
