import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressesRepository } from './repositories/addresses.repository';
import { UpdateAddressesDto } from './dto/update-addresses.dto';

@Injectable()
export class AddressesService {
  constructor(private addressesRepository: AddressesRepository) {}

  async findOne(id: number) {
    const find = await this.addressesRepository.findOne(id);

    if (!find) {
      throw new NotFoundException('Address not found');
    }

    return find;
  }

  async update(id: number, updateAddressesDto: UpdateAddressesDto) {
    const find = await this.addressesRepository.findOne(id);

    if (!find) {
      throw new NotFoundException('Address not found');
    }

    return this.addressesRepository.update(id, updateAddressesDto);
  }

  async remove(id: number) {
    const find = await this.addressesRepository.findOne(id);

    if (!find) {
      throw new NotFoundException('Address not found');
    }

    return this.addressesRepository.delete(id);
  }
}
