import { z, Schema } from 'zod';

import { QuestionValidator } from './question.validator';

export class NumberQuestionValidator extends QuestionValidator {
  protected schema(): Schema {
    const schema = super.schema();

    return schema.and(
      z.object({
        min: z.number().min(0).optional(),
        max: z.number().min(1).optional(),
      }),
    );
  }
}
