import { Module } from '@nestjs/common';
import { ServiceProviderCoreService } from './service-provider-core.service';

@Module({
    providers: [ServiceProviderCoreService],
    exports: [ServiceProviderCoreService],
})
export class ServiceProviderCoreModule { }
