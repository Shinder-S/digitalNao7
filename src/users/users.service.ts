
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from './dto/update-user.dto';
import { Book } from 'src/books/book.entity';
 
@Injectable()
export class UsersService {
  constructor(
   @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

    create(createUserDto: CreateUserDto): Promise<User> {
      return this.userRepository.save(createUserDto);
    }
  
   findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findByEmailWithPassword(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'role'],
    });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateUserDto> {
    console.log(updateUserDto);
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneOrFail({where : { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}