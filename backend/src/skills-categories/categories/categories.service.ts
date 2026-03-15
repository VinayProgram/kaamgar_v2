import { Injectable } from '@nestjs/common';
import { CategoriesCoreService } from '../../core/categories/categories-core.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesCoreService: CategoriesCoreService) {}

  async getAllCategories() {
    return this.categoriesCoreService.findAll();
  }

  async getCategoryById(id: string) {
    return this.categoriesCoreService.findOne(id);
  }

  async getMainCategories() {
    return this.categoriesCoreService.findMainCategories();
  }

  async getSubcategories(parentId: string) {
    return this.categoriesCoreService.findSubcategories(parentId);
  }
}
