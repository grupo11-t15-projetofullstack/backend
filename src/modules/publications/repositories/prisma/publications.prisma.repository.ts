import { Injectable } from '@nestjs/common';
import { PublicationsRepository } from '../publications.repository';
import { Publication } from '../../entities/publications.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PublicationsPrismaRepository implements PublicationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(CreatePublicationDto: any): Promise<Publication> {
    const publication = new Publication();
    Object.assign(publication, {
      ...CreatePublicationDto,
    });
    const newPublication = await this.prisma.publications.create({
      data: { ...CreatePublicationDto },
    });
    return newPublication;
  }
  async findAll(): Promise<Publication[]> {
    const publications = await this.prisma.publications.findMany();
    return publications;
  }
  async findoOne(id: number): Promise<Publication> {
    const publication = await this.prisma.publications.findUnique({
      where: { id },
    });
    return publication;
  }
  async update(id: number, data: any): Promise<Publication> {
    const publication = await this.prisma.publications.update({
      where: { id },
      data: { ...data },
    });
    return publication;
  }
  async delete(id: number): Promise<void> {
    const publication = await this.prisma.publications.delete({
      where: { id },
    });
  }
}
