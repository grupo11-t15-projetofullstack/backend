import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Publication } from '../../entities/publications.entity';
import { PublicationsRepository } from '../publications.repository';

@Injectable()
export class PublicationsPrismaRepository implements PublicationsRepository {
  constructor(private prisma: PrismaService) {}



  async create(CreatePublicationDto: any, userId: string): Promise<Publication> {
    const id = Number(userId)

    const publication = new Publication();
    Object.assign(publication, {
      ...CreatePublicationDto,
      userId: id,
    });
    const newPublication = await this.prisma.publications.create({
      data: {
        model: publication.model,
        make: publication.make,
        year: publication.year,
        color: publication.color,
        fuel: publication.fuel,
        distance: publication.distance,
        isGoodSale: publication.isGoodSale,
        price: publication.price,
        userId: publication.userId,
        description: publication.description,
        coverImg: publication.coverImg,
      },
    });
    const createPublication = await this.prisma.publications.findFirst({
      where: {
        id: newPublication.id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return createPublication;
  }
  async findAll(): Promise<Publication[]> {
    const publications = await this.prisma.publications.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return publications;
  }
  async findOne(id: number): Promise<Publication> {
    const publication = await this.prisma.publications.findUnique({
      where: { id },

      include: {
        user: {
          select:{
            name: true
          }
        },
        comments: {
          select:{
            description: true,
            id: true,
            createdAt: true,
            userId: true,
            user: {
              select: {
                name: true
              }
            }
          }
        }
      }
     
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
