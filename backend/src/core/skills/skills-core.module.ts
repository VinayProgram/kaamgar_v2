import { Module } from '@nestjs/common';
import { SkillsCoreService } from './skills-core.service';

@Module({
  providers: [SkillsCoreService],
  exports: [SkillsCoreService],
})
export class SkillsCoreModule {}
