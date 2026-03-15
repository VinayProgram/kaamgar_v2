import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FetchJobsService } from './fetch-jobs.service';

@ApiTags('Service Provider - Jobs')
@Controller('service-provider/fetch-jobs')
@ApiBearerAuth()
export class FetchJobsController {
  constructor(private readonly fetchJobsService: FetchJobsService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch jobs matching service provider skills, categories and location' })
  async fetchJobs(@Request() req) {
    return this.fetchJobsService.fetchRecommendedJobs(req.user.sub);
  }
}
