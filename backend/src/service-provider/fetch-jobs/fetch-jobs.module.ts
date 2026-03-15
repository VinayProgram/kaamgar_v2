import { Module } from '@nestjs/common';
import { FetchJobsController } from './fetch-jobs.controller';
import { FetchJobsService } from './fetch-jobs.service';
import { JobsCoreModule } from '../../core/jobs-core/jobs-core.module';
import { ServiceProviderCoreModule } from '../../core/service-provider-core/service-provider-core.module';

@Module({
  imports: [
    JobsCoreModule,
    ServiceProviderCoreModule,
  ],
  controllers: [FetchJobsController],
  providers: [FetchJobsService],
})
export class FetchJobsModule {}
