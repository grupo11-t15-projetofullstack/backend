import { Injectable } from '@nestjs/common'
import { CommentsRepository } from '../comments.repository';
import { CreateCommentDto } from '../../dto/create-comment.dto';
import { Comment } from '../../entities/comment.entity';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CommentsPrismaRepository implements CommentsRepository {
    constructor(private prisma: PrismaService) { }
    async create(data: CreateCommentDto, userId: string): Promise<Comment> {
        const publishId = data.publishId
        const id = Number(publishId)
        const idUser = Number(userId)
    
        const comment = new Comment()
        Object.assign(comment, {
            ...data,
            publishId: id,
            userId: idUser
        });
    
        const newComment = await this.prisma.comments.create({
            data: {
                userId: comment.userId,
                description: comment.description,
                publishId: comment.publishId,
              

            },
        });
        const createComment = await this.prisma.comments.findFirst(
            {
                where: {
                    id: newComment.id
                },
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    }

                }
            }
        )
        return createComment;
    }
    async findAll(): Promise<Comment[]> {
        const comments = await this.prisma.comments.findMany(
            {
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        );
        return comments
    }

    async findOne(id: number): Promise<Comment> {
        const comment = await this.prisma.comments.findUnique({
            where: { id },
        });
        return comment
    }

    async update(id: number, data: any): Promise<Comment> {
        const comment = await this.prisma.comments.update({
            where: { id },
            data: { ...data },
        });
        return comment
    }
    async delete(id: number): Promise<void> {
        const comment = await this.prisma.comments.delete({
            where: { id }
        });
    }
}