import { Controller, Post, Body, UsePipes, UseGuards, Request, Get, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JobsPostingService } from './jobs-posting.service';
import { CreateJobDto, CreateJobSchema } from './dto/create-job.dto';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { Request as req } from 'express';

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

  @Put(':id/update')
  @ApiOperation({ summary: 'Update an existing job request' })
  @UsePipes(new ZodValidationPipe(CreateJobSchema))
  async updateJob(
    @Request() req,
    @Body() updateJobDto: any,
    @Request() req2, // Alternative access to params if needed, but :id is better
  ) {
    const consumerUserId = req.user.sub;
    const jobId = req.params.id;
    return this.jobsPostingService.updateJob(jobId, consumerUserId, updateJobDto);
  }

  @Post(':id/close')
  @ApiOperation({ summary: 'Close a job request' })
  async closeJob(@Request() req) {
    const consumerUserId = req.user.sub;
    const jobId = req.params.id;
    return this.jobsPostingService.closeJob(jobId, consumerUserId);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get a job request by ID' })
  async getJobById(@Request() req: req) {
    const jobId = req.params.id as string;
    return this.jobsPostingService.getJobById(jobId);
  }
}
