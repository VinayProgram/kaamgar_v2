import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import { serviceCategories } from '../../db/schemas/categories.schema';

@Injectable()
export class CategoriesCoreService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async findAll() {
    return this.db.select().from(serviceCategories);
  }

  async findOne(id: string) {
    const results = await this.db.select().from(serviceCategories).where(eq(serviceCategories.id, id)).limit(1);
    return results[0];
  }

  async findSubcategories(parentId: string) {
    return this.db.select().from(serviceCategories).where(eq(serviceCategories.parentCategoryId, parentId));
  }

  async findMainCategories() {
    // Return categories where parent is null
    return this.db.select().from(serviceCategories).where(eq(serviceCategories.parentCategoryId, null as any));
  }
}
