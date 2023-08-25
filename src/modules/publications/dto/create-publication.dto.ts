import { Comments } from '@prisma/client';
import { IsNumber, IsString, IsBoolean } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  model: string;

  @IsString()
  make: string;

  @IsNumber()
  year: number;

  @IsString()
  color: string;

  @IsString()
  fuel: string;

  @IsBoolean()
  isGoodSale: boolean;

  @IsString()
  coverImg: string;

  @IsNumber()
  distance: number;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  images: string[];
}
