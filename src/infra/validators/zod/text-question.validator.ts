import { z, Schema } from 'zod';

import { QuestionValidator } from './question.validator';

export class TextQuestionValidator extends QuestionValidator {
  protected schema(): Schema {
    const schema = super.schema();

    return schema.and(
      z.object({
        maxLength: z.number().min(1).optional(),
        minLength: z.number().min(0).optional(),
        isLongText: z.boolean(),
      }),
    );
  }
}
