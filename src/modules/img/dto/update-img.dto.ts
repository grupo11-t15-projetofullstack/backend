/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

class UpdateImgDto {
  @IsString()
  images: string;
}

export default UpdateImgDto;
