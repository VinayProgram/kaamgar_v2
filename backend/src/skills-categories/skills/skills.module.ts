import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { SkillsCoreModule } from '../../core/skills/skills-core.module';

@Module({
  imports: [SkillsCoreModule],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [SkillsService],
})
export class SkillsModule {}
