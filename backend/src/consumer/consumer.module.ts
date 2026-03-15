import { Module } from '@nestjs/common';
import { JobsPostingModule } from './jobs-posting/jobs-posting.module';


@Module({
    imports: [JobsPostingModule],
    exports: [JobsPostingModule]
})
export class ConsumerModule { }


