import { IsNumber, IsString } from 'class-validator';

export class CreateAddressesDto {
  @IsString()
  cep: string;

  @IsString()
  state: string;

  @IsString()
  city: string;

  @IsNumber()
  number: number;

  @IsString()
  complement: string;

  @IsNumber()
  userId: number;
}
