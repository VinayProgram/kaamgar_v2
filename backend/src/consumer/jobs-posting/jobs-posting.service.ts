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
}
