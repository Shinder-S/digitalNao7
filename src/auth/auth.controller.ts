import { 
    Body, 
    Controller,
    Post, 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth';

@ApiTags('users')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiResponse({ status: 201, description: 'User has been created' })
    async login(@Body() loginDto: LoginAuthDto) {
        const token = await this.authService.login(loginDto);
        return { access_token: token };
    }
}
