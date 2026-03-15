import { Injectable } from '@nestjs/common';
import { ServiceProviderProfileCoreService } from '../../core/service-provider-core/service-provider-profile-core.service';
import { ServiceProviderSkillCoreService } from '../../core/service-provider-core/service-provider-skill-core.service';
import { ServiceProviderCategoryCoreService } from '../../core/service-provider-core/service-provider-category-core.service';
import { ServiceProviderLocationCoreService } from '../../core/service-provider-core/service-provider-location-core.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileCore: ServiceProviderProfileCoreService,
    private readonly skillCore: ServiceProviderSkillCoreService,
    private readonly categoryCore: ServiceProviderCategoryCoreService,
    private readonly locationCore: ServiceProviderLocationCoreService,
  ) { }

  async getProfile(userId: string) {
    const profile = await this.profileCore.findByUserId(userId);
    const skills = await this.skillCore.getSkillsByProvider(userId);
    const categories = await this.categoryCore.getCategoriesByProvider(userId);
    const location = await this.locationCore.findByUserId(userId);
    
    return {
      ...profile,
      skillIds: skills.map(s => s.skillId),
      categoryIds: categories.map(c => c.categoryId),
      currentLocation: location,
    };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const { skillIds, categoryIds, latitude, longitude, ...profileData } = dto;

    // Update profile info
    const profile = await this.profileCore.upsert(userId, {
      ...profileData,
      hourlyRate: profileData.hourlyRate?.toString(),
    } as any);

    // Update location if coordinates provided
    if (latitude !== undefined && longitude !== undefined) {
      await this.locationCore.upsert(userId, {
        location: { x: longitude, y: latitude },
        isOnline: true,
      } as any);
    }


    // Update skills if provided
    if (skillIds) {
      await this.skillCore.updateProviderSkills(userId, skillIds);
    }

    // Update categories if provided
    if (categoryIds) {
      await this.categoryCore.updateProviderCategories(userId, categoryIds);
    }

    return this.getProfile(userId);
  }
}
