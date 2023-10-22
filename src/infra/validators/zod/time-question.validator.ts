import { z, Schema } from 'zod';

import { QuestionValidator } from './question.validator';

export class TimeQuestionValidator extends QuestionValidator {
  protected schema(): Schema {
    const schema = super.schema();

    return schema.and(
      z.object({
        min: z
          .string()
          .regex(/^([01]?\d|2[0-3]):[0-5]\d$/)
          .optional(),
        max: z
          .string()
          .regex(/^([01]?\d|2[0-3]):[0-5]\d$/)
          .optional(),
      }),
    );
  }
}
