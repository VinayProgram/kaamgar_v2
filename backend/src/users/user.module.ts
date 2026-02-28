import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserCoreModule } from '../core/user-core/user-core.module';

@Module({
  imports: [UserCoreModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }

