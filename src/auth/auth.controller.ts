import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  UsePipes,
} from '@nestjs/common';
// auth
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignInPayload } from './interfaces/signin-payload.interface';
// user
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<object> {
    const registeredUser = await this.authService.register(user);
    return registeredUser;
  }

  @Post('login')
  async login(@Body() user: CreateUserDto): Promise<object> {
    return await this.authService.createToken(user);
  }
}
