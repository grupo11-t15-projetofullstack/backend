import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { MailService } from '../utils/mail.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    const findCpf = await this.usersRepository.findByCpf(createUserDto.cpf);

    if (findCpf) {
      throw new ConflictException('cpf already exists');
    }

    if (findUser) {
      throw new ConflictException('email already exists');
    }
    const user = await this.usersRepository.create(createUserDto);
    return user;
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: number) {
    const findUser = await this.usersRepository.findOne(id);

    if (!findUser) {
      throw new NotFoundException('User Not found');
    }

    return findUser;
  }

  async findByEmail(email: string) {
    const findUser = await this.usersRepository.findByEmail(email);

    return findUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const findUser = await this.usersRepository.findOne(id);

    if (!findUser) {
      throw new NotFoundException('User Not found');
    }

    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const findUser = await this.usersRepository.findOne(id);

    if (!findUser) {
      throw new NotFoundException('User Not found');
    }

    return this.usersRepository.delete(id);
  }

  async sendEmailResetPassword(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User Not found');
    }

    const resetToken = randomUUID();

    await this.usersRepository.updateToken(email, resetToken);

    const resetPasswordTemplate = await this.mailService.resetPasswordTemplate(
      email,
      user.name,
      resetToken,
    );
    await this.mailService.sendEMail(resetPasswordTemplate);
  }

  async resetPassword(password: string, resetToken: string) {
    const user = await this.usersRepository.findByToken(resetToken);

    if (!user) {
      throw new NotFoundException('User Not found');
    }

    await this.usersRepository.updatePassword(user.id, password);
  }
}
