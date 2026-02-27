import { Module } from '@nestjs/common';
import { UserRegisterCoreService } from './user-register-core.service';

@Module({
    providers: [UserRegisterCoreService],
    exports: [UserRegisterCoreService],
})
export class UserRegisterCoreModule { }
