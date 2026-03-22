import { z } from 'zod';
import { CreateJobSchema } from './create-job.dto';

export const UpdateJobSchema = CreateJobSchema.partial();

export type UpdateJobDto = z.infer<typeof UpdateJobSchema>;
