import { Module } from '@nestjs/common';
import { ServiceProviderProfileCoreService } from './service-provider-profile-core.service';
import { ServiceProviderSkillCoreService } from './service-provider-skill-core.service';
import { ServiceProviderCategoryCoreService } from './service-provider-category-core.service';
import { ServiceProviderLocationCoreService } from './service-provider-location-core.service';

@Module({
    providers: [
        ServiceProviderProfileCoreService,
        ServiceProviderSkillCoreService,
        ServiceProviderCategoryCoreService,
        ServiceProviderLocationCoreService,
    ],
    exports: [
        ServiceProviderProfileCoreService,
        ServiceProviderSkillCoreService,
        ServiceProviderCategoryCoreService,
        ServiceProviderLocationCoreService,
    ],
})
export class ServiceProviderCoreModule { }
