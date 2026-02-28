import { Module } from '@nestjs/common';
import { ProfileCoreService } from './profile-core.service';
import { CategoryCoreService } from './category-core.service';
import { SkillCoreService } from './skill-core.service';
import { RatingCoreService } from './rating-core.service';
import { WorkHistoryCoreService } from './work-history-core.service';
import { LocationCoreService } from './location-core.service';
import { JobsCoreService } from './jobs-core.service';

@Module({
    providers: [
        ProfileCoreService,
        CategoryCoreService,
        SkillCoreService,
        RatingCoreService,
        WorkHistoryCoreService,
        LocationCoreService,
        JobsCoreService,
    ],
    exports: [
        ProfileCoreService,
        CategoryCoreService,
        SkillCoreService,
        RatingCoreService,
        WorkHistoryCoreService,
        LocationCoreService,
        JobsCoreService,
    ],
})

export class ServiceMarketplaceCoreModule { }
