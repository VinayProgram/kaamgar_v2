import { Module } from '@nestjs/common';
import { JobsPostingModule } from './jobs-posting/jobs-posting.module';
import { ServiceProvidersModule } from './service-providers/service-providers.module';


@Module({
    imports: [JobsPostingModule, ServiceProvidersModule],
    exports: [JobsPostingModule, ServiceProvidersModule]
})
export class ConsumerModule { }


