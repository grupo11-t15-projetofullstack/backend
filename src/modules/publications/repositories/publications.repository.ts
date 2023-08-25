import { CreatePublicationDto } from '../dto/create-publication.dto';
import { UpdatePublicationDto } from '../dto/update-publication.dto';
import { Publication } from '../entities/publications.entity';

export abstract class PublicationsRepository {
  abstract create(data: CreatePublicationDto, userId: string): Promise<Publication>;
  abstract findAll(): Promise<Publication[]>;
  abstract findOne(id: number): Promise<Publication>;
  abstract update(id: number, data: UpdatePublicationDto): Promise<Publication>;
  abstract delete(id: number): Promise<void>;
}
