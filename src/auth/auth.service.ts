import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-auth';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
    ){}

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmail(email);

    if(!user) {
      throw new UnauthorizedException('Invalid user');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword) {
      throw new UnauthorizedException("Wrong Password");
    }

    const payload = { email: user.email };

    const token = await this.jwtService.signAsync(payload)


    return {
      token,
      email,
    };
  }

  async register({ name, email, password }: RegisterDto) {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    await this.userService.create({
      userName: '',
      email,
      password: await bcrypt.hash(password, 10),
    });

    return {
      name,
      email,
    };
  }

  async profile({ email, role }: { email: string; role: string }) {
    return await this.userService.findOneByEmail(email);
  }
}
  