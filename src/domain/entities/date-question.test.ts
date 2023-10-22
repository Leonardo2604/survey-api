import { EntityValidationError } from '@/core/errors/entity-validation-error';
import { QuestionType } from '../enums/question-type';
import { DateQuestion } from './date-question';

describe('DateQuestion', () => {
  it('Should be able to create a date question', () => {
    const props = {
      surveyId: 'a07d55d5-4d45-44c7-b80c-0e7978ae40a7',
      title: 'Quando começou a trabalhar com programação?',
      description: 'description',
      order: 1,
      max: new Date('2021-12-31'),
      min: new Date('2010-01-01'),
      required: true,
    };

    const question = DateQuestion.create(props);

    expect(question.id).toBeDefined();
    expect(question.surveyId).toBe(props.surveyId);
    expect(question.title).toBe(props.title);
    expect(question.type).toBe(QuestionType.DATE);
    expect(question.description).toBe(props.description);
    expect(question.order).toBe(props.order);
    expect(question.min?.getTime()).toBe(props.min.getTime());
    expect(question.max?.getTime()).toBe(props.max.getTime());
    expect(question.required).toBe(props.required);
    expect(question.createdAt).toBeDefined();
    expect(question.updatedAt).toBeDefined();
    expect(question.deletedAt).toBeUndefined();
  });

  it('Should not be able to create an invalid date question', () => {
    expect(() => {
      const props = {
        surveyId: '1221121221',
        title: 'Quando começou a trabalhar com programação?',
        description: 'description',
        order: -1,
        max: new Date('2021-12-31'),
        min: new Date('2010-01-01'),
        required: true,
      };

      DateQuestion.create(props);
    }).toThrow(EntityValidationError);
  });

  it('Should be able to restore a date question', () => {
    const props = {
      id: '123',
      surveyId: 'a07d55d5-4d45-44c7-b80c-0e7978ae40a7',
      title: 'Quando começou a trabalhar com programação?',
      description: 'description.',
      order: 1,
      max: new Date('2021-12-31'),
      min: new Date('2010-01-01'),
      required: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const question = DateQuestion.restore(props);

    expect(question.id).toBe(props.id);
    expect(question.surveyId).toBe(props.surveyId);
    expect(question.title).toBe(props.title);
    expect(question.description).toBe(props.description);
    expect(question.order).toBe(props.order);
    expect(question.type).toBe(QuestionType.DATE);
    expect(question.min?.getTime()).toBe(props.min.getTime());
    expect(question.max?.getTime()).toBe(props.max.getTime());
    expect(question.required).toBe(props.required);
    expect(question.createdAt.getTime()).toBe(props.createdAt.getTime());
    expect(question.updatedAt.getTime()).toBe(props.updatedAt.getTime());
    expect(question.deletedAt?.getTime()).toBe(props.deletedAt.getTime());
  });

  it('Should be able to change the date question min value', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      surveyId: 'a07d55d5-4d45-44c7-b80c-0e7978ae40a7',
      title: 'Quando começou a trabalhar com programação?',
      description: 'description.',
      order: 1,
      max: new Date('2021-12-31'),
      min: new Date('2010-01-01'),
      required: true,
      createdAt: pastDate,
      updatedAt: pastDate,
    };

    const question = DateQuestion.restore(props);

    const validateSpy = vi.spyOn(question, 'validate');

    const newMin = new Date('2015-01-01');

    question.changeMin(newMin);

    expect(question.min?.getTime()).toBe(newMin.getTime());
    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(question.updatedAt.getTime()).toBeGreaterThan(
      props.updatedAt.getTime(),
    );
  });

  it('Should be able to change the Date question max value', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      surveyId: 'a07d55d5-4d45-44c7-b80c-0e7978ae40a7',
      title: 'Quando começou a trabalhar com programação?',
      description: 'description.',
      order: 1,
      max: new Date('2021-12-31'),
      min: new Date('2010-01-01'),
      required: true,
      createdAt: pastDate,
      updatedAt: pastDate,
    };

    const question = DateQuestion.restore(props);

    const validateSpy = vi.spyOn(question, 'validate');

    const newMax = new Date('2020-12-31');

    question.changeMax(newMax);

    expect(question.max?.getTime()).toBe(newMax.getTime());
    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(question.updatedAt.getTime()).toBeGreaterThan(
      props.updatedAt.getTime(),
    );
  });
});
