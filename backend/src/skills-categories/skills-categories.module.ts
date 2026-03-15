import { Module } from '@nestjs/common';
import { SkillsModule } from './skills/skills.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [SkillsModule, CategoriesModule],
  exports: [SkillsModule, CategoriesModule],
})
export class SkillsCategoriesModule {}
