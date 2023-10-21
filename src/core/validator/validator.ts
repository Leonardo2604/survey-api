import { Entity } from '../entities/entity';
import { ValidationResult } from './validation-result';

// eslint-disable-next-line
export interface Validator<E extends Entity<any>> {
  validate(entity: E): ValidationResult;
}
