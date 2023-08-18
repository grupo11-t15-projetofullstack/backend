import { PartialType } from '@nestjs/mapped-types';
import { Images } from '@prisma/client';
import { CreatePublicationDto } from './create-publication.dto';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
  model: string;
  make: string;
  year: number;
  color: string;
  fuel: string;
  isGoodSale: boolean;
  coverImg: string;
  distance: number;
  price: number;
  description: string;
  // comments: Comment[];
  images: Images[];
}
