import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { FetchJobsModule } from './fetch-jobs/fetch-jobs.module';

@Module({
  imports: [ProfileModule, FetchJobsModule],
  exports: [ProfileModule, FetchJobsModule]
})
export class ServiceProviderModule { }

