import { Module } from '@nestjs/common';
import { DatabaseConnectionModule } from './db/database-connection.module';
import { ConsumerModule } from './consumer/consumer.module';
import { ServiceProviderModule } from './service-provider/service-provider.module';
import { UserRegisterModule } from './user-register/user-register.module';

@Module({
  imports: [DatabaseConnectionModule, ConsumerModule, ServiceProviderModule, UserRegisterModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
