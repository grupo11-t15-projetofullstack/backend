import { Injectable } from '@nestjs/common';
import { AddressesRepository } from '../addresses.repository';
import { UpdateAddressesDto } from '../../dto/update-addresses.dto';
import { Addresses } from '../../entities/addresses.entity';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AddressesPrismaRepository implements AddressesRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number): Promise<Addresses> {
    const address = await this.prisma.adresses.findUnique({
      where: { id },
    });
    return plainToInstance(Addresses, address);
  }

  async update(id: number, data: UpdateAddressesDto): Promise<Addresses> {
    const address = await this.prisma.adresses.update({
      where: { id },
      data: { ...data },
    });

    return plainToInstance(Addresses, address);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.adresses.delete({
      where: { id },
    });
  }
}
