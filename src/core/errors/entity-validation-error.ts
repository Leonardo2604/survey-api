import { ValidationError } from '../validator/validation-error';
import { AppError } from './app-error';

export class EntityValidationError extends AppError {
  constructor(
    private errors: ValidationError[],
    message = 'Validation fails',
  ) {
    super(message);
  }

  getErrors() {
    return this.errors;
  }
}
