import { Controller, Post, Body, UsePipes, Res, Get, Request } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { RegisterUserDto, RegisterUserSchema } from './dto/register-user.dto';
import { LoginDto, LoginSchema } from './dto/login.dto';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { Public } from '../../common/decorators/public.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterUserSchema))
  async register(@Body() registerDto: RegisterUserDto) {
    return this.userService.registerUser(registerDto);
  }

  @Public()
  @Post('login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.userService.login(loginDto, response);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
