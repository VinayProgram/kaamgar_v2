import { Module } from '@nestjs/common';
import { JobsPostingController } from './jobs-posting.controller';
import { JobsPostingService } from './jobs-posting.service';
import { JobsCoreModule } from '../../core/jobs-core/jobs-core.module';

@Module({
  imports: [JobsCoreModule],
  controllers: [JobsPostingController],
  providers: [JobsPostingService],
})
export class JobsPostingModule { }
