import { v4, validate as UUIDValidate } from 'uuid';
import { ValueObject } from './value-object';
import { InvalidUUIDError } from '../errors/invalid-uuid-error';

export class UUID extends ValueObject<string> {
  private readonly _value: string;

  constructor(uuid?: string) {
    super();
    this._value = uuid ?? v4();
    this.validate();
  }

  private validate() {
    if (!UUIDValidate(this.getValue())) {
      throw new InvalidUUIDError();
    }
  }

  getValue(): string {
    return this._value;
  }
}
