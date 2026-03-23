import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ServiceProvidersService } from './service-providers.service';

@ApiTags('Consumer Service Providers Search')
@Controller('consumer/service-providers')
export class ServiceProvidersController {
    constructor(private readonly serviceProvidersService: ServiceProvidersService) { }

    @Get('search')
    @ApiOperation({ summary: 'Search for service providers with filters' })
    async searchProviders(
        @Query('categoryId') categoryId?: string,
        @Query('skillIds') skillIds?: string | string[],
        @Query('query') query?: string,
        @Query('lat') lat?: number,
        @Query('lng') lng?: number,
        @Query('limit') limit?: number,
        @Query('offset') offset?: number,
    ) {
        return this.serviceProvidersService.searchProviders({
            categoryId,
            skillIds: skillIds ? (Array.isArray(skillIds) ? skillIds : [skillIds]) : undefined,
            query,
            lat: lat ? Number(lat) : undefined,
            lng: lng ? Number(lng) : undefined,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
        });
    }
}
