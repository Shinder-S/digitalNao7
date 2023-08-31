import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtAuthService: JwtService
    ){}

    async register({ userName, email, password }: LoginAuthDto) {
      const user = await this.userService.findByEmail(email);

      if(user) {
        throw new BadRequestException('User already exists');
      }

      await this.userService.createUser({
        userName: " ",
        email,
        password: await bcrypt.hash(password, 10),
      });

      return {
        userName,
        email,
      };
    }

    async validateUser(email: string, password: string): Promise<User | null> {
      const user = await this.userService.findByEmail(email);
      if (user && await bcrypt.compare(password, user.password)) {
        return user;
      }
      return null;
    }
    
    async login(loginAuthDto: LoginAuthDto) {
      const user = await this.validateUser(
        loginAuthDto.email,
        loginAuthDto.password,
        );
        
        if (!user) {
          console.log('Invalid credentials');
          return null;
        }
        
        const payload = { email: user.email, sub: user.id }; 
        const token = this.jwtAuthService.sign(payload);
        console.log('Generated token:', token);
        return { access_token: token };
      }

      async profile({ email, role}: { email:string; role: string }) {
        return await this.userService.findByEmail(email);
      }
    }
    