import isEqual from 'lodash.isequal';

export abstract class ValueObject<Type> {
  abstract getValue(): Type;

  equals(vo: this): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.constructor.name !== this.constructor.name) {
      return false;
    }

    return isEqual(this, vo);
  }
}
