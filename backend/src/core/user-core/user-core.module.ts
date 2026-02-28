import { Module } from '@nestjs/common';
import { UserCoreService } from './user-core.service';

@Module({
    providers: [UserCoreService],
    exports: [UserCoreService],
})
export class UserCoreModule { }

