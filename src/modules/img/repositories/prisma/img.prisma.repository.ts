/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { ImgRepository } from '../img.repository';
import { PrismaService } from 'src/database/prisma.service';
import CreateImgDto from '../../dto/create-img.dto';
import Img from '../../entities/img.entity';
import { plainToInstance } from 'class-transformer';
import UpdateImgDto from '../../dto/update-img.dto';

@Injectable()
export class ImgPrismaRepository implements ImgRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateImgDto): Promise<Img> {
    const img = new Img();
    Object.assign(img, {
      ...data,
    });

    const newImgs = await this.prisma.images.create({
      data: { ...Img },
    });

    return plainToInstance(Img, newImgs);
  }

  async findOne(id: number): Promise<Img> {
    const imgs = await this.prisma.images.findUnique({
      where: { id },
    });
    return plainToInstance(Img, imgs);
  }

  async update(id: number, data: UpdateImgDto): Promise<Img> {
    const img = await this.prisma.images.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(Img, img);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.images.delete({
      where: { id },
    });
  }
}
