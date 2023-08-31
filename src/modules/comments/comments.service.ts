import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsRepository } from './repositories/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private commentsRepository: CommentsRepository) {}

  async create(createCommentDto: CreateCommentDto, userId:string) {

    const comment = await this.commentsRepository.create(
      createCommentDto,
      userId,
    );
 
    return comment;
  }

  async findAll() {
    return await this.commentsRepository.findAll();
  }

  async findOne(id: number) {
    const find = await this.commentsRepository.findOne(id);
    if (!find) {
      throw new NotFoundException('Address not found');
    }

    return find;
  
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const find = await this.commentsRepository.findOne(id);

    if (!find) {
      throw new NotFoundException('Address not found');
    }

    return this.commentsRepository.update(id, updateCommentDto);
  }

  async remove(id: number) {
    const find = await this.commentsRepository.findOne(id);

    if (!find) {
      throw new NotFoundException('Address not found');
    }

    return this.commentsRepository.delete(id);
  }
}
