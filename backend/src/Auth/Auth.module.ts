import { Module } from '@nestjs/common';
import { AuthController } from './Auth.Controller';
import { AuthService } from './Auth.service';
import { AuthCoreModule } from 'src/core/auth-core/auth-core.module';

@Module({
  imports: [AuthCoreModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }


