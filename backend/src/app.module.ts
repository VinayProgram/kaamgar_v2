import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { DatabaseConnectionModule } from './db/database-connection.module';
import { ServiceProviderModule } from './service-provider/service-provider.module';
import { AuthGuard } from './common/guards/auth.guard';
import { AuthCoreModule } from './core/auth-core/auth-core.module';
import { ConsumerModule } from './consumer/Consumer.module';

@Module({
  imports: [
    DatabaseConnectionModule,
    AuthCoreModule,
    RouterModule.register([
      {
        path: 'consumer',
        module: ConsumerModule,
      },
      {
        path: 'service-provider',
        module: ServiceProviderModule,
      },
    ]),
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
