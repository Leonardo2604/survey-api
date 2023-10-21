import { ValidationError } from '../validator/validation-error';
import { AppError } from './app-error';

export class EntityValidationError extends AppError {
  constructor(
    private _errors: ValidationError[],
    message = 'Validation fails',
  ) {
    super(message);
  }

  get errors() {
    return this._errors;
  }
}
