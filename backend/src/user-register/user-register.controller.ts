import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UserRegisterService } from './user-register.service';
import { RegisterUserDto, RegisterUserSchema } from './dto/register-user.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { Public } from '../common/decorators/public.decorator';

@Controller('user-register')
export class UserRegisterController {
  constructor(private readonly userRegisterService: UserRegisterService) { }

  @Public()
  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterUserSchema))
  async register(@Body() registerDto: RegisterUserDto) {
    return this.userRegisterService.registerUser(registerDto);
  }
}
