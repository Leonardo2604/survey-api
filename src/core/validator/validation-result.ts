import { ValidationError } from './validation-error';

export class ValidationResult {
  private constructor(private _errors: ValidationError[]) {}

  static success() {
    return new ValidationResult([]);
  }

  static fails(errors: ValidationError[]) {
    return new ValidationResult(errors);
  }

  get errors(): ValidationError[] {
    return this._errors;
  }

  get failed(): boolean {
    return this.errors.length > 0;
  }
}
