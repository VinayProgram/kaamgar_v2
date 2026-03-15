import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION, Database } from '../../db/database-connection.module';
import { skills } from '../../db/schemas/skills.schema';

@Injectable()
export class SkillsCoreService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async findAll() {
    return this.db.select().from(skills);
  }

  async findOne(id: string) {
    const results = await this.db.select().from(skills).where(eq(skills.id, id)).limit(1);
    return results[0];
  }

  async findBySlug(slug: string) {
    const results = await this.db.select().from(skills).where(eq(skills.slug, slug)).limit(1);
    return results[0];
  }
}
