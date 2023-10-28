import { AppError } from './app-error';

export class InvalidUUIDError extends AppError {
  constructor(message = 'Invalid provided uuid') {
    super(message);
  }
}
