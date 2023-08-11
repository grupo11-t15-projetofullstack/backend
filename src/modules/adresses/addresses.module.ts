import { PrismaService } from 'src/database/prisma.service';
import { AddressesService } from './addresses.service';
import { AddressesRepository } from './repositories/addresses.repository';
import { Module } from '@nestjs/common';
import { AddressesPrismaRepository } from './repositories/prisma/addresses.prisma.repository';
import { AddressesController } from './addresses.controller';

@Module({
  controllers: [AddressesController],
  providers: [
    AddressesService,
    PrismaService,
    {
      provide: AddressesRepository,
      useClass: AddressesPrismaRepository,
    },
  ],
})
export class AddressesModule {}
