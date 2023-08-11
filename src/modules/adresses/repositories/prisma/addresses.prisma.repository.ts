import { Injectable } from '@nestjs/common';
import { AddressesRepository } from '../addresses.repository';
import { CreateAddressesDto } from '../../dto/create-addresses.dto';
import { UpdateAddressesDto } from '../../dto/update-addresses.dto';
import { Addresses } from '../../entities/addresses.entity';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AddressesPrismaRepository implements AddressesRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAddressesDto): Promise<Addresses> {
    const address = new Addresses();

    Object.assign(address, {
      ...data,
    });

    const newAddress = await this.prisma.adresses.create({
      data: { ...address },
    });

    return plainToInstance(Addresses, newAddress);
  }

  async findAll(): Promise<Addresses[]> {
    const address = await this.prisma.adresses.findMany();
    return plainToInstance(Addresses, address);
  }

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
