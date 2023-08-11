import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './repositories/publications.repository';

@Injectable()
export class PublicationsService {
  constructor(private publicationsRepository: PublicationsRepository) {}

  async create(createPublicationDto: CreatePublicationDto) {
    const publication = await this.publicationsRepository.create(
      createPublicationDto,
    );
    return publication;
  }

  async findAll() {
    return await this.publicationsRepository.findAll();
  }

  async findOne(id: number) {
    const find = await this.publicationsRepository.findOne(id);

    if (!find) {
      throw new NotFoundException('Address not found');
    }

    return find;
  }

  async update(id: number, updatePublicationDto: UpdatePublicationDto) {
    const find = await this.publicationsRepository.findOne(id);

    if (!find) {
      throw new NotFoundException('Address not found');
    }

    return this.publicationsRepository.update(id, updatePublicationDto);
  }

  async remove(id: number) {
    const find = await this.publicationsRepository.findOne(id);

    if (!find) {
      throw new NotFoundException('Address not found');
    }

    return this.publicationsRepository.delete(id);
  }
}
