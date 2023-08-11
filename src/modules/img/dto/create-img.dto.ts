/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

class CreateImgDto {
  @IsString()
  images: string;

  @IsString()
  @IsNotEmpty()
  readonly publicationsId: number;
}

export default CreateImgDto;
