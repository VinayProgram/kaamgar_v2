import { Module } from '@nestjs/common';
import { ConsumerUserModule } from './Auth/user.module';

@Module({
    imports: [ConsumerUserModule],
})
export class ConsumerModule { }


