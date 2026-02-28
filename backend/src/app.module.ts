import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseConnectionModule } from './db/database-connection.module';
import { ConsumerModule } from './consumer/consumer.module';
import { ServiceProviderModule } from './service-provider/service-provider.module';
import { UserModule } from './users/user.module';
import { AuthGuard } from './common/guards/auth.guard';

@Module({
  imports: [
    DatabaseConnectionModule,
    ConsumerModule,
    ServiceProviderModule,
    UserModule,
  ],

  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
