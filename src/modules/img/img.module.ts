/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ImgController } from './img.controller';
import { ImgService } from './img.service';
import { PrismaService } from 'src/database/prisma.service';
import { ImgRepository } from './repositories/img.repository';
import { ImgPrismaRepository } from './repositories/prisma/img.prisma.repository';

@Module({
  controllers: [ImgController],
  providers: [
    ImgService,
    PrismaService,
    {
      provide: ImgRepository,
      useClass: ImgPrismaRepository,
    },
  ],
})
export class ImgModule {}
