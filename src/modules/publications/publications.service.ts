import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './repositories/publications.repository';


@Injectable()
export class PublicationsService {
  constructor(private PublicationRepository: PublicationsRepository) { }
  async create(data: CreatePublicationDto) {
    return await this.PublicationRepository.create(data)
  }

  async findAll() {
    return await this.PublicationRepository.findAll();
  }

  async findOne(id: number) {
    const publication = await this.PublicationRepository.findoOne(id);
    if (!publication) {
      throw new NotFoundException("Publication not found")
    }
    return publication;
  }

  async update(id: number, data: UpdatePublicationDto) {
    const publication = await this.PublicationRepository.update(id, data);
    if (!publication) {
      throw new NotFoundException("Publication not found")
    }
    return publication
  }

  remove(id: number) {
    return this.PublicationRepository.delete(id);

  }
}