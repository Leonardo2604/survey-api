import { z, Schema } from 'zod';

import { Question } from '@/domain/entities/question';
import { ZodValidator } from './zod-validator';
import { QuestionType } from '@/domain/enums/question-type';

export class QuestionValidator extends ZodValidator<Question> {
  protected schema(): Schema {
    return z.object({
      title: z.string().max(120),
      description: z.string().max(256),
      order: z.number().min(0),
      surveyId: z.string().uuid(),
      type: z.nativeEnum(QuestionType),
      required: z.boolean(),
    });
  }
}
