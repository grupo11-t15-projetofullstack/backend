import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../users.repository";
import { PrismaService } from "src/database/prisma.service";
import { CreateUserDto } from "../../dto/create-user.dto";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { User } from "../../entities/user.entity";
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
    constructor(private prisma: PrismaService) {}
        
    async create(data: CreateUserDto): Promise<User> {
        const newUser = await this.prisma.user.create({
            data: { ...data}
          });
    
        return plainToInstance(User, newUser);
      }

    async findAll(): Promise<User[]> {
      const users = await this.prisma.user.findMany();
      return plainToInstance(User, users);
    }

    async findOne(id: number): Promise<User> {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
  
      return plainToInstance(User, user);
    }
  
    async findByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findFirst({
            where: {
                email: email
              },
              include: {
                address: true // Inclui os endereços do usuário
              }
        });
    
        return user;
      }
      
    async update(id: number, data: UpdateUserDto): Promise<User> {
      const user = await this.prisma.user.update({
        where: { id },
        data: { ...data },
      });
  
      return plainToInstance(User, user);
    }
    async delete(id: number): Promise<void> {
      await this.prisma.user.delete({
        where: { id },
      });
    }
}