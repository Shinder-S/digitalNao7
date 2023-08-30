
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user';
 
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
        ) {}
        
        async createUser(userDto: CreateUserDto): Promise<User> {
            const { email, userName, password } = userDto;

            const userEmailRepeat = await this.userRepository.
            await this.usersRepository.save(newUser);
            return newUser;
        }

        async getUsers(): Promise<User> {
            throw new Error("Method not implemented.");
        }


        async deleteUser(id: number): Promise<User> {
            throw new Error("Method not implemented.");
        }
}