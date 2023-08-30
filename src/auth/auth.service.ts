import { Injectable, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtAuthService:JwtService
    ){}

    async register(userObject: RegisterAuthDto){
        const { password } = userObject;
        const convertToHash = await hash(password, 10);
        userObject = {...userObject, password:convertToHash};
        const newUser = this.userRepository.create(userObject);
        return this.userRepository.save(newUser);
    }

    async login(userObjectLogin: LoginAuthDto) {
        const {userName, password} = userObjectLogin;
        console.log(userName)
        const findUser = await this.userRepository.findOne({ where: {userName: userName } });
        if(!findUser) throw new HttpException('Cannot find this user', 404);

        const passwordCheck = await compare(password, findUser.password);
        if(!passwordCheck) throw new HttpException('PASSWORD_INCORRECT', 403);

        const payload = {id:findUser.id, userName:findUser.userName}
        const token = await this.jwtAuthService.sign(payload)

        const data = {
            user: findUser,
            token: token,
        };

        return data;
    }
}
