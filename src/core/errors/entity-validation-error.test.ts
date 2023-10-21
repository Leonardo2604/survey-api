import { EntityValidationError } from './entity-validation-error';

describe('EntityValidationError', () => {
  it('Should be able to retrive erros from exeption', () => {
    const errors = [
      {
        message: 'teste',
      },
    ];

    const exception = new EntityValidationError(errors);

    expect(exception.getErrors()).toEqual(errors);
  });
});
