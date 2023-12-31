import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { UsersRepository } from '../users.repository';
import { Addresses } from 'src/modules/adresses/entities/addresses.entity';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private prisma: PrismaService) { }
  async create(data: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, {
      ...data,
    });
    const newUser = await this.prisma.user.create({
      data: {
        avatar: user.avatar,
        birth: user.birth,
        cpf: user.cpf,
        description: user.description,
        email: user.email,
        isSeller: user.isSeller,
        name: user.name,
        password: user.password,
        phone: user.phone,
        id: user.id,
      },
    });

    const addressData = data.addressId;
    const address = new Addresses();
    Object.assign(address, {
      ...addressData,
    });

    await this.prisma.adresses.create({
      data: { ...address, userId: newUser.id },
    });
    return plainToInstance(User, newUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return plainToInstance(User, users);
  }
  async findOne(id: number): Promise<User> {
    const users = await this.prisma.user.findUnique({
      where: { id },
      include: {
        address: {
          select: {
            id: true,
            cep: true,
            state: true,
            city: true,
            street: true,
            number: true,
            complement: true,
          }
        },
        publications: {
          select: {
            id: true,
            model: true,
            make: true,
            year: true,
            color: true,
            fuel: true,
            isGoodSale: true,
            coverImg: true,
            distance: true,
            price: true,
            createdAt: true,
            description: true,
            // user: false,
            comments: true,
            images: true,
            _count: true,
          }
        }
      }
    });
    return plainToInstance(User, users);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    return user;
  }

  async findByToken(token: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { reset_token: token },
    });

    return user;
  }

  async findByCpf(cpf: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { cpf },
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

  async updateToken(email: string, token: string): Promise<void> {
    await this.prisma.user.update({
      where: { email },
      data: { reset_token: token },
    });
  }
  async updatePassword(id: number, password: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: {
        password: hashSync(password, 10),
        reset_token: null,
      },
    });
  }
}
