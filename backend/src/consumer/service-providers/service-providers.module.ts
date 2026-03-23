import { Module } from '@nestjs/common';
import { ServiceProvidersController } from './service-providers.controller';
import { ServiceProvidersService } from './service-providers.service';
import { ServiceProvidersCoreModule } from '../../core/consumer-core/service-providers-core/service-providers-core.module';

@Module({
  imports: [ServiceProvidersCoreModule],
  controllers: [ServiceProvidersController],
  providers: [ServiceProvidersService],
  exports: [ServiceProvidersService],
})
export class ServiceProvidersModule {}
