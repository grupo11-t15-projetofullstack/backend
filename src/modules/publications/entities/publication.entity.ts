import { Comments, Images, User } from '@prisma/client';

export class Publication {
  readonly id: number;
  model: string;
  make: string;
  year: number;
  color: string;
  fuel: string;
  isGoodSale: boolean;
  coverImg: string;
  distance: number;
  price: number;
  readonly createdAt: Date | string;
  description: string;
  userId: User;
  comments: Comments[];
  images: Images[];
}
