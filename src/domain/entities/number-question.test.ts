import { EntityValidationError } from '@/core/errors/entity-validation-error';
import { QuestionType } from '../enums/question-type';
import { NumberQuestion } from './number-question';

describe('NumberQuestion', () => {
  it('Should be able to create a number question', () => {
    const props = {
      surveyId: '9cf621ec-6f6c-43f7-8dd8-6e4872933018',
      title: 'Quantas linguagens de programação você sabe?',
      description: 'description',
      order: 1,
      max: 1,
      min: 12,
      required: true,
    };

    const question = NumberQuestion.create(props);

    expect(question.id).toBeDefined();
    expect(question.surveyId).toBe(props.surveyId);
    expect(question.title).toBe(props.title);
    expect(question.type).toBe(QuestionType.NUMBER);
    expect(question.description).toBe(props.description);
    expect(question.order).toBe(props.order);
    expect(question.min).toBe(props.min);
    expect(question.max).toBe(props.max);
    expect(question.required).toBe(props.required);
    expect(question.createdAt).toBeDefined();
    expect(question.updatedAt).toBeDefined();
    expect(question.deletedAt).toBeUndefined();
  });

  it('Should not be able to create an invalid number question', () => {
    expect(() => {
      const props = {
        surveyId: '12122112',
        title: 'Quantas linguagens de programação você sabe?',
        description: 'description',
        order: -1,
        max: -1,
        min: -12,
        required: true,
      };

      NumberQuestion.create(props);
    }).toThrow(EntityValidationError);
  });

  it('Should be able to restore a number question', () => {
    const props = {
      id: '123',
      surveyId: '9cf621ec-6f6c-43f7-8dd8-6e4872933018',
      title: 'Quantas linguagens de programação você sabe?',
      description: 'description.',
      order: 1,
      max: 64,
      min: 16,
      required: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const question = NumberQuestion.restore(props);

    expect(question.id).toBe(props.id);
    expect(question.surveyId).toBe(props.surveyId);
    expect(question.title).toBe(props.title);
    expect(question.description).toBe(props.description);
    expect(question.order).toBe(props.order);
    expect(question.type).toBe(QuestionType.NUMBER);
    expect(question.min).toBe(props.min);
    expect(question.max).toBe(props.max);
    expect(question.required).toBe(props.required);
    expect(question.createdAt.getTime()).toBe(props.createdAt.getTime());
    expect(question.updatedAt.getTime()).toBe(props.updatedAt.getTime());
    expect(question.deletedAt?.getTime()).toBe(props.deletedAt.getTime());
  });

  it('Should be able to change the number question min value', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      surveyId: '9cf621ec-6f6c-43f7-8dd8-6e4872933018',
      title: 'Quantas linguagens de programação você sabe?',
      description: 'description.',
      order: 1,
      max: 64,
      min: 16,
      required: true,
      createdAt: pastDate,
      updatedAt: pastDate,
    };

    const question = NumberQuestion.restore(props);

    const validateSpy = vi.spyOn(question, 'validate');

    const newMin = 12;

    question.changeMin(newMin);

    expect(question.min).toBe(newMin);
    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(question.updatedAt.getTime()).toBeGreaterThan(
      props.updatedAt.getTime(),
    );
  });

  it('Should be able to change the number question max value', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      surveyId: '9cf621ec-6f6c-43f7-8dd8-6e4872933018',
      title: 'Quantas linguagens de programação você sabe?',
      description: 'description.',
      order: 1,
      max: 64,
      min: 16,
      required: true,
      createdAt: pastDate,
      updatedAt: pastDate,
    };

    const question = NumberQuestion.restore(props);

    const validateSpy = vi.spyOn(question, 'validate');

    const newMax = 80;

    question.changeMax(newMax);

    expect(question.max).toBe(newMax);
    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(question.updatedAt.getTime()).toBeGreaterThan(
      props.updatedAt.getTime(),
    );
  });
});
