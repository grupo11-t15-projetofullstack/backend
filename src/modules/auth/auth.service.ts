import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.findByEmail(userEmail);
    if (user) {
      const passwordMatch = await compare(userPassword, user.password);
      if (passwordMatch) {
        return { email: user.email };
      }
    }

    return null;
  }

  async login(email: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const payload = { email: user.email };
      const jwtOptions = { subject: String(user.id) } as const;

      return {
        token: this.jwtService.sign(payload, jwtOptions),
      };
    }
    // Handle the case where user is not found
    throw new NotFoundException('User not found');
  }
}
