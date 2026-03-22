import { Injectable } from '@nestjs/common';
import { JobsCoreService } from '../../core/jobs-core/jobs-core.service';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsPostingService {
  constructor(private readonly jobsCoreService: JobsCoreService) { }

  async createJob(consumerUserId: string, createJobDto: CreateJobDto) {
    return this.jobsCoreService.create(consumerUserId, createJobDto);
  }

  async getConsumerJobs(consumerUserId: string) {
    return this.jobsCoreService.findByConsumer(consumerUserId);
  }

  async updateJob(jobId: string, consumerUserId: string, updateJobDto: any) {
    return this.jobsCoreService.update(jobId, consumerUserId, updateJobDto);
  }

  async closeJob(jobId: string, consumerUserId: string) {
    return this.jobsCoreService.close(jobId, consumerUserId);
  }

  async getJobById(jobId: string) {
    return this.jobsCoreService.findByIdWithDetails(jobId);
  }
}
