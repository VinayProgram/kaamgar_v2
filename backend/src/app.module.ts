import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseConnectionModule } from './db/database-connection.module';
import { ConsumerModule } from './consumer/consumer.module';
import { ServiceProviderModule } from './service-provider/service-provider.module';
import { AuthGuard } from './common/guards/auth.guard';
import { AuthCoreModule } from './core/auth-core/auth-core.module';

@Module({
  imports: [
    DatabaseConnectionModule,
    AuthCoreModule, // 👈 Global JWT configuration
    ConsumerModule,
    ServiceProviderModule,
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
