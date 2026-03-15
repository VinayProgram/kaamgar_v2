import { Injectable } from '@nestjs/common';
import { SkillsCoreService } from '../../core/skills/skills-core.service';

@Injectable()
export class SkillsService {
  constructor(private readonly skillsCoreService: SkillsCoreService) {}

  async getAllSkills() {
    return this.skillsCoreService.findAll();
  }

  async getSkillById(id: string) {
    return this.skillsCoreService.findOne(id);
  }
}
