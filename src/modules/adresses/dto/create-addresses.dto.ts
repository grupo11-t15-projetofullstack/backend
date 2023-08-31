import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateAddressesDto {
  @IsString()
  @MaxLength(8)
  cep: string;

  @IsString()
  @MaxLength(2)
  state: string;

  @IsString()
  city: string;

  @IsString()
  street: string

  @IsNumber()
  number: number;

  @IsString()
  complement: string;
}
