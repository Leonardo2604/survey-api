import { z, Schema } from 'zod';

import { Survey } from '@/domain/entities/survey';
import { ZodValidator } from './zod-validator';

export class SurveyValidator extends ZodValidator<Survey> {
  protected schema(): Schema {
    return z.object({
      title: z.string().max(120),
      description: z.string().max(256),
    });
  }
}
