import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ServiceProviderCoreModule } from '../../core/service-provider-core/service-provider-core.module';

@Module({
  imports: [ServiceProviderCoreModule],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule { }
