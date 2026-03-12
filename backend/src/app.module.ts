import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseConnectionModule } from './db/database-connection.module';
import { AuthGuard } from './common/guards/auth.guard';
import { AuthCoreModule } from './core/auth-core/auth-core.module';
import { AuthModule } from './Auth/Auth.module';

@Module({
  imports: [
    DatabaseConnectionModule,
    AuthCoreModule,
    AuthModule

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
