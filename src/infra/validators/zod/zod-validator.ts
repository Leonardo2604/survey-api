import { Schema } from 'zod';

import { ValidationResult } from '@/core/validator/validation-result';
import { Validator } from '@/core/validator/validator';
import { ValidationError } from '@/core/validator/validation-error';
import { Entity } from '@/core/entities/entity';

// eslint-disable-next-line
export abstract class ZodValidator<E extends Entity<any>>
  implements Validator<E>
{
  protected abstract schema(entity: E): Schema;

  validate(entity: E): ValidationResult {
    const schema = this.schema(entity);
    const result = schema.safeParse(entity.toJSON());

    if (result.success) {
      return ValidationResult.success();
    }

    const errors: ValidationError[] = result.error.errors.map((error) => {
      return {
        message: `${error.path}: ${error.message}`.toLocaleLowerCase(),
      };
    });

    return ValidationResult.fails(errors);
  }
}
