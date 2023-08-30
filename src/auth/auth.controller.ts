import { 
    Body, 
    Controller,
    Post, 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiResponse({ status: 201, description: 'User has been created' })
    registerUser(@Body() userObject: RegisterAuthDto){
        return this.authService.register(userObject);
    }

    @Post('login')
    @ApiResponse({ status: 201, description: 'User has been created' })
    loginUser(@Body() userObjectLogin: LoginAuthDto) {
        return this.authService.login(userObjectLogin);
    }
}
