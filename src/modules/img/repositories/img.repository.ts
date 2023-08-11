/* eslint-disable prettier/prettier */
import CreateImgDto from '../dto/create-img.dto';
import UpdateImgDto from '../dto/update-img.dto';
import Img from '../entities/img.entity';

export abstract class ImgRepository {
  abstract create(data: CreateImgDto): Promise<Img>;
  abstract findOne(id: number): Promise<Img>;
  abstract delete(id: number): Promise<void>;
  abstract update(id: number, data: UpdateImgDto): Promise<Img> | Img;
}
