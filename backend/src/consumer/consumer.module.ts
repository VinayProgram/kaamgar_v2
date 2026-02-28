import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConsumerController } from './consumer.controller';
import { ConsumerUserModule } from './users-consumer/user.module';

@Module({
  imports: [ConsumerUserModule],
  controllers: [ConsumerController],
  providers: [ConsumerService],
})
export class ConsumerModule { }
