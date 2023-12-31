import { EntityValidationError } from '@/core/errors/entity-validation-error';
import { QuestionType } from '../enums/question-type';
import { ColorQuestion } from './color-question';

describe('ColorQuestion', () => {
  it('Should be able to create a color question', () => {
    const props = {
      surveyId: 'cc4c6b6f-cf44-40d0-8a88-7961b6bfd03e',
      title: 'Qual a cor deve aparecer no banner?',
      description: 'description.',
      order: 1,
      required: true,
    };

    const question = ColorQuestion.create(props);

    expect(question.id).toBeDefined();
    expect(question.surveyId).toBe(props.surveyId);
    expect(question.title).toBe(props.title);
    expect(question.type).toBe(QuestionType.COLOR);
    expect(question.description).toBe(props.description);
    expect(question.order).toBe(props.order);
    expect(question.required).toBe(props.required);
    expect(question.createdAt).toBeDefined();
    expect(question.updatedAt).toBeDefined();
    expect(question.deletedAt).toBeUndefined();
  });

  it('Should not be able to create an invalid color question', () => {
    expect(() => {
      const props = {
        surveyId: '12121212',
        title: 'Qual a cor deve aparecer no banner?',
        description: 'description.',
        order: -1,
        required: true,
      };

      ColorQuestion.create(props);
    }).toThrow(EntityValidationError);
  });

  it('Should be able to restore a color question', () => {
    const props = {
      id: '123',
      surveyId: 'cc4c6b6f-cf44-40d0-8a88-7961b6bfd03e',
      title: 'Qual a cor deve aparecer no banner?',
      description: 'description.',
      order: 1,
      required: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const question = ColorQuestion.restore(props);

    expect(question.id).toBe(props.id);
    expect(question.surveyId).toBe(props.surveyId);
    expect(question.title).toBe(props.title);
    expect(question.type).toBe(QuestionType.COLOR);
    expect(question.description).toBe(props.description);
    expect(question.order).toBe(props.order);
    expect(question.required).toBe(props.required);
    expect(question.createdAt.getTime()).toBe(props.createdAt.getTime());
    expect(question.updatedAt.getTime()).toBe(props.updatedAt.getTime());
    expect(question.deletedAt?.getTime()).toBe(props.deletedAt.getTime());
  });
});
