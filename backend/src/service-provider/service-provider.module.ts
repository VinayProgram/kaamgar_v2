import { Module } from '@nestjs/common';
import { ServiceProviderUserModule } from './Auth/user.module';

@Module({
  imports: [ServiceProviderUserModule],
  controllers: [],
  providers: [],
})
export class ServiceProviderModule { }
