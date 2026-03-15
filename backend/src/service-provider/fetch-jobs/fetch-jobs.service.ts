import { Injectable, NotFoundException } from '@nestjs/common';
import { JobsCoreService } from '../../core/jobs-core/jobs-core.service';
import { ServiceProviderSkillCoreService } from '../../core/service-provider-core/service-provider-skill-core.service';
import { ServiceProviderCategoryCoreService } from '../../core/service-provider-core/service-provider-category-core.service';
import { ServiceProviderLocationCoreService } from '../../core/service-provider-core/service-provider-location-core.service';

@Injectable()
export class FetchJobsService {
  constructor(
    private readonly jobsCore: JobsCoreService,
    private readonly skillCore: ServiceProviderSkillCoreService,
    private readonly categoryCore: ServiceProviderCategoryCoreService,
    private readonly locationCore: ServiceProviderLocationCoreService,
  ) {}

  async fetchRecommendedJobs(userId: string) {
    // 1. Get provider's skills
    const skills = await this.skillCore.getSkillsByProvider(userId);
    const skillIds = skills.map((s) => s.skillId);

    // 2. Get provider's categories
    const categories = await this.categoryCore.getCategoriesByProvider(userId);
    const categoryIds = categories.map((c) => c.categoryId);

    // 3. Get provider's current location
    const locationRecord = await this.locationCore.findByUserId(userId);
    
    if (!locationRecord) {
        throw new NotFoundException('Service provider location not set. Please update your profile with your location.');
    }

    const location = locationRecord.location as any;
    const longitude = typeof location.x === 'number' ? location.x : (Array.isArray(location) ? location[0] : 0);
    const latitude = typeof location.y === 'number' ? location.y : (Array.isArray(location) ? location[1] : 0);

    // 4. Fetch jobs matching skills, categories and proximity
    return this.jobsCore.findNearbyJobs({
      skillIds,
      categoryIds,
      latitude,
      longitude,
      radiusMeters: 50000, // 50km default
    });
  }
}
