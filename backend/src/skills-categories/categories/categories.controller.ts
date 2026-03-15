import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get('main')
  @ApiOperation({ summary: 'Get main categories' })
  async getMainCategories() {
    return this.categoriesService.getMainCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get category by ID' })
  async getCategoryById(@Param('id') id: string) {
    return this.categoriesService.getCategoryById(id);
  }

  @Get(':id/sub')
  @ApiOperation({ summary: 'Get subcategories of a category' })
  async getSubcategories(@Param('id') id: string) {
    return this.categoriesService.getSubcategories(id);
  }
}
