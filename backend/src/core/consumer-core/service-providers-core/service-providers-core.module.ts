import { Module } from '@nestjs/common';
import { ServiceProvidersCoreService } from './service-providers-core.service';

@Module({
    providers: [ServiceProvidersCoreService],
    exports: [ServiceProvidersCoreService],
})
export class ServiceProvidersCoreModule { }
