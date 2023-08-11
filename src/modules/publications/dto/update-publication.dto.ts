import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDto } from './create-publication.dto';
import { Images } from '@prisma/client';
import { Comment } from 'src/modules/comments/entities/comment.entity';

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
  comments: Comment[];
  images: Images[];
}
