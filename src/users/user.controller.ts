import { Body, Controller, Get, Post, Delete, Patch, Param, UseGuards, ParseIntPipe } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user';
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/auth.guard";

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiResponse({ status: 201, description: 'The list of our users could be found' })
    getUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiResponse({ status: 201, description: 'The list of our users could be found' })
    getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.userService.findOne(id);
    }


    @Get('search/:email')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get user by email' })
    @ApiResponse({ status: 200, description: 'User found' })
    async findByEmail(@Param('email') email: string): Promise<User> {
        return this.userService.findByEmail(email);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiResponse({ status: 201, description: 'The user is been delete' })
    async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
        await this.userService.deleteUser(id);
        return { message: 'User was deleted' };
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @ApiResponse({ status: 201, description: 'User has been updated' })
    updateUser(@Param('id') id: number, @Body() updateUserDto: User): Promise<User> {
        return this.userService.updateUser(id, updateUserDto);
    }


}