import { ValidationError } from './validation-error';

export class ValidationResult {
  private constructor(private errors: ValidationError[]) {}

  static success() {
    return new ValidationResult([]);
  }

  static fails(errors: ValidationError[]) {
    return new ValidationResult(errors);
  }

  getErrors(): ValidationError[] {
    return this.errors;
  }

  failed(): boolean {
    return this.errors.length > 0;
  }
}
