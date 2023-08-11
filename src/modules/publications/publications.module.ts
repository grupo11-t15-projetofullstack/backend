import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PrismaService } from 'src/database/prisma.service';
import { PublicationsRepository } from './repositories/publications.repository';
import { PublicationsPrismaRepository } from './repositories/prisma/publications.prisma.repository';

@Module({
  controllers: [PublicationsController],
  providers: [
    PublicationsService,
    PrismaService,
    {
      provide: PublicationsRepository,
      useClass: PublicationsPrismaRepository,
    },
  ],
})
export class PublicationsModule {}
