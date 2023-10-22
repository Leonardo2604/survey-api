import { z, Schema } from 'zod';

import { QuestionValidator } from './question.validator';

export class DateQuestionValidator extends QuestionValidator {
  protected schema(): Schema {
    const schema = super.schema();

    return schema.and(
      z.object({
        min: z.date().optional(),
        max: z.date().optional(),
      }),
    );
  }
}
