import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseConnectionModule } from './db/database-connection.module';
import { AuthGuard } from './common/guards/auth.guard';
import { AuthCoreModule } from './core/auth-core/auth-core.module';
import { AuthModule } from './auth/Auth.module';
import { ConsumerModule } from './consumer/Consumer.module';
import { SkillsCategoriesModule } from './skills-categories/skills-categories.module';
import { ServiceProviderModule } from './service-provider/service-provider.module';

@Module({
  imports: [
    DatabaseConnectionModule,
    AuthCoreModule,
    AuthModule,
    ConsumerModule,
    SkillsCategoriesModule,
    ServiceProviderModule
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
