import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION, Database } from '../../../db/database-connection.module';
import {
    serviceProviderProfiles,
    serviceProviderSkills,
    serviceProviderCategoryMap,
} from '../../../db/schemas/service-marketplace.schema';
import { users } from '../../../db/schemas/user.schema';
import { skills } from '../../../db/schemas/skills.schema';
import { serviceCategories } from '../../../db/schemas/categories.schema';
import { eq, and, or, ilike, sql, inArray } from 'drizzle-orm';

@Injectable()
export class ServiceProvidersCoreService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: Database
    ) { }

    async searchProviders(params: {
        categoryId?: string;
        skillIds?: string[];
        query?: string;
        lat?: number;
        lng?: number;
        limit?: number;
        offset?: number;
    }) {
        const { categoryId, skillIds, query, limit = 20, offset = 0 } = params;

        return await this.db.transaction(async (tx) => {
            let candidateUserIds: string[] | null = null; // null means "consider all providers"

            // Handle Query string search
            if (query) {
                const matchedUserIds = new Set<string>();
                let foundInSkillsOrCats = false;

                // 1. Search skills
                const matchedSkills = await tx.select({ id: skills.id })
                    .from(skills).where(ilike(skills.name, `%${query}%`));
                
                if (matchedSkills.length > 0) {
                    const sIds = matchedSkills.map(s => s.id);
                    const userSkills = await tx.select({ userId: serviceProviderSkills.serviceUserId })
                        .from(serviceProviderSkills).where(inArray(serviceProviderSkills.skillId, sIds));
                    userSkills.forEach(u => matchedUserIds.add(u.userId));
                    if (userSkills.length > 0) foundInSkillsOrCats = true;
                }

                // 2. Search categories
                const matchedCats = await tx.select({ id: serviceCategories.id })
                    .from(serviceCategories).where(ilike(serviceCategories.name, `%${query}%`));
                
                if (matchedCats.length > 0) {
                    const cIds = matchedCats.map(c => c.id);
                    const userCats = await tx.select({ userId: serviceProviderCategoryMap.serviceUserId })
                        .from(serviceProviderCategoryMap).where(inArray(serviceProviderCategoryMap.categoryId, cIds));
                    userCats.forEach(u => matchedUserIds.add(u.userId));
                    if (userCats.length > 0) foundInSkillsOrCats = true;
                }

                // 3. Fallback or combine profile search
                if (!foundInSkillsOrCats) {
                    // if results are 0 for skills and categories then go for user profile bio tagline
                    const profileMatches = await tx.select({ userId: users.id })
                        .from(users)
                        .innerJoin(serviceProviderProfiles, eq(users.id, serviceProviderProfiles.serviceUserId))
                        .where(
                            and(
                                eq(users.registrationType, 'service_provider'),
                                or(
                                    ilike(users.firstName, `%${query}%`),
                                    ilike(users.lastName, `%${query}%`),
                                    ilike(serviceProviderProfiles.tagline, `%${query}%`),
                                    ilike(serviceProviderProfiles.bio, `%${query}%`)
                                )
                            )
                        );
                    profileMatches.forEach(u => matchedUserIds.add(u.userId));
                } else {
                    // else keep or better searching
                    const profileMatches = await tx.select({ userId: users.id })
                        .from(users)
                        .innerJoin(serviceProviderProfiles, eq(users.id, serviceProviderProfiles.serviceUserId))
                        .where(
                            and(
                                eq(users.registrationType, 'service_provider'),
                                or(
                                    ilike(users.firstName, `%${query}%`),
                                    ilike(users.lastName, `%${query}%`),
                                    ilike(serviceProviderProfiles.tagline, `%${query}%`),
                                    ilike(serviceProviderProfiles.bio, `%${query}%`)
                                )
                            )
                        );
                    profileMatches.forEach(u => matchedUserIds.add(u.userId));
                }

                candidateUserIds = Array.from(matchedUserIds);
                
                // Early exit if query produced no result
                if (candidateUserIds.length === 0) {
                    return []; 
                }
            }

            // Handle explicit category filter
            if (categoryId) {
                const userCats = await tx.select({ userId: serviceProviderCategoryMap.serviceUserId })
                    .from(serviceProviderCategoryMap)
                    .where(eq(serviceProviderCategoryMap.categoryId, categoryId));
                
                const catUserIds = userCats.map(u => u.userId);
                if (candidateUserIds === null) {
                    candidateUserIds = catUserIds;
                } else {
                    candidateUserIds = candidateUserIds.filter(id => catUserIds.includes(id));
                }

                if (candidateUserIds.length === 0) return [];
            }

            // Handle explicit skills filter
            if (skillIds && skillIds.length > 0) {
                // Must have ALL skillIds
                for (const sId of skillIds) {
                    const uSkills = await tx.select({ userId: serviceProviderSkills.serviceUserId })
                        .from(serviceProviderSkills)
                        .where(eq(serviceProviderSkills.skillId, sId));
                    
                    const sUserIds = uSkills.map(u => u.userId);
                    if (candidateUserIds === null) {
                        candidateUserIds = sUserIds;
                    } else {
                        candidateUserIds = candidateUserIds.filter(id => sUserIds.includes(id));
                    }

                    if (candidateUserIds.length === 0) return [];
                }
            }

            // Now fetch paginated profiles using limit & offset
            let qb = tx.select({
                    userId: users.id,
                    fullName: sql<string>`${users.firstName} || ' ' || ${users.lastName}`,
                    tagline: serviceProviderProfiles.tagline,
                    bio: serviceProviderProfiles.bio,
                    profilePictureUrl: serviceProviderProfiles.profilePictureUrl,
                    city: serviceProviderProfiles.city,
                    yearsOfExperience: serviceProviderProfiles.yearsOfExperience,
                    hourlyRate: serviceProviderProfiles.hourlyRate,
                })
                .from(users)
                .innerJoin(serviceProviderProfiles, eq(users.id, serviceProviderProfiles.serviceUserId))
                .limit(limit)
                .offset(offset);
            
            // Build the final Where clause
            const wheres: any[] = [eq(users.registrationType, 'service_provider')];
            if (candidateUserIds !== null) {
                wheres.push(inArray(users.id, candidateUserIds));
            }

            const results = await qb.where(and(...wheres));

            const providerIds = results.map(r => r.userId);
            
            if (providerIds.length === 0) return [];

            // Fetch skills and categories for these specific paginated providers
            const providerSkills = await tx
                .select({
                    userId: serviceProviderSkills.serviceUserId,
                    id: skills.id,
                    name: skills.name,
                })
                .from(serviceProviderSkills)
                .innerJoin(skills, eq(serviceProviderSkills.skillId, skills.id))
                .where(inArray(serviceProviderSkills.serviceUserId, providerIds));

            const providerCategories = await tx
                .select({
                    userId: serviceProviderCategoryMap.serviceUserId,
                    id: serviceCategories.id,
                    name: serviceCategories.name,
                })
                .from(serviceProviderCategoryMap)
                .innerJoin(serviceCategories, eq(serviceProviderCategoryMap.categoryId, serviceCategories.id))
                .where(inArray(serviceProviderCategoryMap.serviceUserId, providerIds));

            // Map and return enriched results
            return results.map(p => ({
                ...p,
                skills: providerSkills.filter(s => s.userId === p.userId).map(s => ({ id: s.id, name: s.name })),
                categories: providerCategories.filter(c => c.userId === p.userId).map(c => ({ id: c.id, name: c.name })),
            }));
        });
    }
}
