import { Controller, Post, Body, UsePipes, UseGuards, Request, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JobsPostingService } from './jobs-posting.service';
import { CreateJobDto, CreateJobSchema } from './dto/create-job.dto';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@ApiTags('Jobs Posting')
@Controller('jobs')
@ApiBearerAuth()
export class JobsPostingController {
  constructor(private readonly jobsPostingService: JobsPostingService) { }

  @Post('post-job')
  @ApiOperation({ summary: 'Create a new job request' })
  @UsePipes(new ZodValidationPipe(CreateJobSchema))
  async createJob(@Request() req, @Body() createJobDto: CreateJobDto) {
    const consumerUserId = req.user.sub;
    return this.jobsPostingService.createJob(consumerUserId, createJobDto);
  }

  @Get('my-jobs')
  @ApiOperation({ summary: 'Get all jobs posted by the authenticated consumer' })
  async getMyJobs(@Request() req) {
    const consumerUserId = req.user.sub;
    return this.jobsPostingService.getConsumerJobs(consumerUserId);
  }
}
