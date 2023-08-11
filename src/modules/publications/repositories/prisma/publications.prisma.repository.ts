import { Injectable } from '@nestjs/common';
import { PublicationsRepository } from '../publications.repository';
import { CreatePublicationDto } from '../../dto/create-publication.dto';
import { UpdatePublicationDto } from '../../dto/update-publication.dto';
import { Publication } from '../../entities/publication.entity';
import { PrismaService } from 'src/database/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PublicationsPrismaRepository implements PublicationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePublicationDto): Promise<Publication> {
    const publication = new Publication();
    Object.assign(publication, {
      ...data,
    });
    const newPublication = await this.prisma.publications.create({
      data: {
        color: publication.color,
        coverImg: publication.coverImg,
        description: publication.description,
        distance: publication.distance,
        fuel: publication.fuel,
        isGoodSale: publication.isGoodSale,
        make: publication.make,
        model: publication.model,
        price: publication.price,
        year: publication.year,
        userId: publication.userId.id,
      },
    });

    return plainToInstance(Publication, newPublication);
  }

  async findAll(): Promise<Publication[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(id: number): Promise<Publication> {
    throw new Error('Method not implemented.');
  }

  async update(id: number, data: UpdatePublicationDto): Promise<Publication> {
    throw new Error('Method not implemented.');
  }

  async delete(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
