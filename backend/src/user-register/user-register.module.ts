import { Module } from '@nestjs/common';
import { UserRegisterService } from './user-register.service';
import { UserRegisterController } from './user-register.controller';
import { UserRegisterCoreModule } from '../core/user-register-core/user-register-core.module';

@Module({
  imports: [UserRegisterCoreModule],
  controllers: [UserRegisterController],
  providers: [UserRegisterService],
})
export class UserRegisterModule { }
