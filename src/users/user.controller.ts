import { Body, Controller, Get, Post, Delete, Patch, Param, UseGuards, ParseIntPipe } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user';
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { ApiTags, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/auth.guard";

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController{
    constructor(private readonly userService:UsersService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiResponse({ status: 201, description: 'The list of our users could be found' })
    getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiResponse({ status: 201, description: 'The list of our users could be found' })
    getUser(@Param('id', ParseIntPipe) id: number): Promise <User>{
        return this.userService.findUserById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiResponse({ status: 201, description: 'User has been created' })
    createUser(@Body() newUser: CreateUserDto): Promise<User> {
        return this.userService.create(newUser);
    }   
       
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiResponse({ status: 201, description: 'The user is been delete' })
    deleteUser(@Param('id', ParseIntPipe) id: number): Promise <User>{
        return this.userService.deleteUser(id);
    }


}