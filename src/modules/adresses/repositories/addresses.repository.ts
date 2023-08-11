import { CreateAddressesDto } from '../dto/create-addresses.dto';
import { UpdateAddressesDto } from '../dto/update-addresses.dto';
import { Addresses } from '../entities/addresses.entity';

export abstract class AddressesRepository {
  abstract create(data: CreateAddressesDto): Promise<Addresses>;
  abstract findAll(): Promise<Addresses[]>;
  abstract findOne(id: number): Promise<Addresses>;
  abstract update(id: number, data: UpdateAddressesDto): Promise<Addresses>;
  abstract delete(id: number): Promise<void>;
}
