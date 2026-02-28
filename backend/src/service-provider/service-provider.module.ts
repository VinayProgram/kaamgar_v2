import { Module } from '@nestjs/common';
import { ServiceProviderService } from './service-provider.service';
import { ServiceProviderController } from './service-provider.controller';
import { ServiceProviderUserModule } from './users-service-providers/user.module';

@Module({
  imports: [ServiceProviderUserModule],
  controllers: [ServiceProviderController],
  providers: [ServiceProviderService],
})
export class ServiceProviderModule { }
