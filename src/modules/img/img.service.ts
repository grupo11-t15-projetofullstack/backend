/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import CreateImgDto from './dto/create-img.dto';
import { ImgRepository } from './repositories/img.repository';
import UpdateImgDto from './dto/update-img.dto';

@Injectable()
export class ImgService {
  constructor(private imgRepository: ImgRepository) {}

  async create(createImgDto: CreateImgDto) {
    return await this.imgRepository.create(createImgDto);
  }

  async update(id: number, updateImgDto: UpdateImgDto) {
    const findImg = await this.imgRepository.findOne(id);

    if (!findImg) {
      throw new NotFoundException('Image Not Found!');
    }

    return await this.imgRepository.update(id, updateImgDto);
  }

  async remove(id: number) {
    const findImg = await this.imgRepository.findOne(id);

    if (!findImg) {
      throw new NotFoundException('Image Not Found!');
    }

    return await this.imgRepository.delete(id);
  }

 
}
