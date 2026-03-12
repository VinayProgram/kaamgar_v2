import { Controller, Post, Body, UsePipes, Res, Get, Request } from '@nestjs/common';
import { Response } from 'express';
import { RegisterUserDto, RegisterUserSchema } from './dto/register-user.dto';
import { LoginDto, LoginSchema } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { AuthService } from './Auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new consumer' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        phoneNumber: { type: 'string' },
        password: { type: 'string' },
        registrationType: { type: 'string' },
      },
      required: ['firstName', 'lastName', 'email', 'password'],
    },
  })
  @UsePipes(new ZodValidationPipe(RegisterUserSchema))
  async register(@Body() registerDto: RegisterUserDto) {
    return this.authService.registerUser(registerDto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Consumer login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
    },
  })
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(loginDto, response);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get consumer profile' })
  getProfile(@Request() req) {
    return req.user;
  }
}
