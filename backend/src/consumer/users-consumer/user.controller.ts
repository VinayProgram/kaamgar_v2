import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto, RegisterUserSchema } from './dto/register-user.dto';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { Public } from '../../common/decorators/public.decorator';

@Controller('consumer/users')

export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Post('register')
  @UsePipes(new ZodValidationPipe(RegisterUserSchema))
  async register(@Body() registerDto: RegisterUserDto) {
    return this.userService.registerUser(registerDto);
  }
}
