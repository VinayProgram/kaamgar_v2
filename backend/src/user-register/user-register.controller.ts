import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UserRegisterService } from './user-register.service';
import { RegisterUserDto, RegisterUserSchema } from './dto/register-user.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@Controller('user-register')
export class UserRegisterController {
  constructor(private readonly userRegisterService: UserRegisterService) { }

  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterUserSchema))
  async register(@Body() registerDto: RegisterUserDto) {
    return this.userRegisterService.registerUser(registerDto);
  }
}
