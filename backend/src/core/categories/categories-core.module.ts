import { Module } from '@nestjs/common';
import { CategoriesCoreService } from './categories-core.service';

@Module({
  providers: [CategoriesCoreService],
  exports: [CategoriesCoreService],
})
export class CategoriesCoreModule {}
