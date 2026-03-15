import { Module } from '@nestjs/common';
import { JobsCoreService } from './jobs-core.service';

@Module({
  providers: [JobsCoreService],
  exports: [JobsCoreService],
})
export class JobsCoreModule { }
