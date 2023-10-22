import { EntityValidationError } from '@/core/errors/entity-validation-error';
import { QuestionOption } from './question-option';

describe('QuestionOption', () => {
  it('Should be able to create a question option', () => {
    const props = {
      questionId: '75ec07ce-5b76-4baa-87bd-fb40bce984e5',
      title: 'Option 1',
      value: '1',
      order: 1,
    };

    const option = QuestionOption.create(props);

    expect(option.id).toBeDefined();
    expect(option.questionId).toBe(props.questionId);
    expect(option.title).toBe(props.title);
    expect(option.value).toBe(props.value);
    expect(option.order).toBe(props.order);
    expect(option.createdAt).toBeDefined();
    expect(option.updatedAt).toBeDefined();
    expect(option.deletedAt).toBeUndefined();
  });

  it('Should not be able to create an invalid question option', () => {
    expect(() => {
      const props = {
        questionId: '1212212',
        title: 'Option 1',
        value: '2121221',
        order: -2,
      };

      QuestionOption.create(props);
    }).toThrow(EntityValidationError);
  });

  it('Should be able to restore a question option', () => {
    const props = {
      id: '123',
      questionId: '123',
      title: 'Option 1',
      value: '1',
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const option = QuestionOption.restore(props);

    expect(option.id).toBe(props.id);
    expect(option.questionId).toBe(props.questionId);
    expect(option.title).toBe(props.title);
    expect(option.value).toBe(props.value);
    expect(option.order).toBe(props.order);
    expect(option.createdAt.getTime()).toBe(props.createdAt.getTime());
    expect(option.updatedAt.getTime()).toBe(props.updatedAt.getTime());
    expect(option.deletedAt?.getTime()).toBe(props.deletedAt.getTime());
  });

  it('Should be able to change the question option title', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      questionId: '123',
      title: 'Option 1',
      value: '1',
      order: 1,
      createdAt: pastDate,
      updatedAt: pastDate,
    };

    const option = QuestionOption.restore(props);

    const validateSpy = vi.spyOn(option, 'validate');

    const newValue = 'Vermelho';

    option.changeTitle(newValue);

    expect(option.title).toBe(newValue);
    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(option.updatedAt.getTime()).toBeGreaterThan(
      props.updatedAt.getTime(),
    );
  });

  it('Should be able to change the question option value', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      questionId: '123',
      title: 'Option 1',
      value: '1',
      order: 1,
      createdAt: pastDate,
      updatedAt: pastDate,
    };

    const option = QuestionOption.restore(props);

    const validateSpy = vi.spyOn(option, 'validate');

    const newValue = '3';

    option.changeValue(newValue);

    expect(option.value).toBe(newValue);
    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(option.updatedAt.getTime()).toBeGreaterThan(
      props.updatedAt.getTime(),
    );
  });

  it('Should be able to delete a question option', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      questionId: '123',
      title: 'Option 1',
      value: '1',
      order: 1,
      createdAt: pastDate,
      updatedAt: pastDate,
    };

    const option = QuestionOption.restore(props);

    option.delete();

    expect(option.deletedAt).toBeDefined();
  });
});
