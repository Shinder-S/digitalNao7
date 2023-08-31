
import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user';
import * as bcrypt from 'bcrypt'; 
 
@Injectable()
export class UsersService {
  constructor(
   @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
      const { email, userName, password } = createUserDto;
  
      const userWithEmail = await this.userRepository.findOne({ where: { email } });
      if (userWithEmail) {
        throw new ConflictException('Email already exists');
      }
  
      const userWithUsername = await this.userRepository.findOne({ where: { userName } });
      if (userWithUsername) {
        throw new ConflictException('Username already exists');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10); 
      const user = this.userRepository.create({
        email,
        userName,
        password: hashedPassword,
        isAdmin: createUserDto.isAdmin,
      });
      return this.userRepository.save(user);
    }
  
  
    async findAll(): Promise<User[]> {
      return this.userRepository.find();
    }
  
    async findOne(id: number): Promise<User> {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }
  
    async updateUser(id: number, updateUserDto: User): Promise<User> {
      const user = await this.findOne(id);
  
      const { email, userName } = updateUserDto;
      if (email) {
        user.email = email;
      }
      if (userName) {
        user.userName = userName;
      }
      if (updateUserDto.password) {
        user.password = updateUserDto.password;
      }
      if (updateUserDto.isAdmin !== undefined) {
        user.isAdmin = updateUserDto.isAdmin;
      }
  
      return this.userRepository.save(user);
    }
  
    async deleteUser(id: number): Promise<string> {
      const user = await this.findOne(id);
  
      await this.userRepository.remove(user);
  
      return 'User deleted successfully';
    }
  
  
    async findByEmail(email: string): Promise<User> {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }
}