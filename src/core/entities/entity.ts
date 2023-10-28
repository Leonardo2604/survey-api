import { EntityValidationError } from '../errors/entity-validation-error';
import { Validator } from '../validator/validator';
import { UUID } from '../value-objects/uuid.ov';

export abstract class Entity<Props> {
  protected abstract get validator(): Validator<this>;

  abstract getIdentity(): UUID;

  abstract toJSON(): Props;

  validate(): void {
    const validation = this.validator.validate(this);

    if (validation.failed) {
      throw new EntityValidationError(validation.errors);
    }
  }
}
