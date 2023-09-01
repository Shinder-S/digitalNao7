import { Body, Controller, Get, Post, Delete, Patch, Param } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user';
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }

}