import { z, Schema } from 'zod';

import { ZodValidator } from './zod-validator';
import { QuestionOption } from '@/domain/entities/question-option';

export class QuestionOptionValidator extends ZodValidator<QuestionOption> {
  protected schema(): Schema {
    return z.object({
      title: z.string().max(120),
      value: z.string().max(60),
      order: z.number().min(0),
    });
  }
}
