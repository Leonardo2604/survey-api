import { EntityValidationError } from '../errors/entity-validation-error';
import { Validator } from '../validator/validator';

export abstract class Entity<Props> {
  protected abstract get validator(): Validator<this>;

  abstract toJSON(): Props;

  validate(): void {
    const validation = this.validator.validate(this);

    if (validation.failed) {
      throw new EntityValidationError(validation.errors);
    }
  }
}
