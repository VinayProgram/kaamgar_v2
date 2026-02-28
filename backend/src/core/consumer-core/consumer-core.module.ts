import { Module } from '@nestjs/common';
import { ConsumerCoreService } from './consumer-core.service';

@Module({
    providers: [ConsumerCoreService],
    exports: [ConsumerCoreService],
})
export class ConsumerCoreModule { }
