import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConsumerCoreModule } from '../../core/consumer-core/consumer-core.module';

@Module({
  imports: [ConsumerCoreModule],

  controllers: [UserController],
  providers: [UserService],
})
export class ConsumerUserModule { }


