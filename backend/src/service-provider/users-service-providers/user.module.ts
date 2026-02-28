import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ServiceProviderCoreModule } from '../../core/service-provider-core/service-provider-core.module';

@Module({
  imports: [ServiceProviderCoreModule],
  controllers: [UserController],
  providers: [UserService],
})
export class ServiceProviderUserModule { }

