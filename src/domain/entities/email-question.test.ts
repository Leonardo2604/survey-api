import { EntityValidationError } from '@/core/errors/entity-validation-error';
import { QuestionType } from '../enums/question-type';
import { EmailQuestion } from './email-question';

describe('EmailQuestion', () => {
  it('Should be able to create a email question', () => {
    const props = {
      surveyId: 'cc4c6b6f-cf44-40d0-8a88-7961b6bfd03e',
      title: 'Qual o seu melhor email?',
      description: 'description.',
      order: 1,
      required: true,
    };

    const question = EmailQuestion.create(props);

    expect(question.id).toBeDefined();
    expect(question.surveyId).toBe(props.surveyId);
    expect(question.title).toBe(props.title);
    expect(question.type).toBe(QuestionType.EMAIL);
    expect(question.description).toBe(props.description);
    expect(question.order).toBe(props.order);
    expect(question.required).toBe(props.required);
    expect(question.createdAt).toBeDefined();
    expect(question.updatedAt).toBeDefined();
    expect(question.deletedAt).toBeUndefined();
  });

  it('Should not be able to create an invalid email question', () => {
    expect(() => {
      const props = {
        surveyId: '21212',
        title: 'Qual o seu melhor email?',
        description: 'description.',
        order: -1,
        required: true,
      };

      EmailQuestion.create(props);
    }).toThrow(EntityValidationError);
  });

  it('Should be able to restore a email question', () => {
    const props = {
      id: '123',
      surveyId: 'cc4c6b6f-cf44-40d0-8a88-7961b6bfd03e',
      title: 'Qual o seu melhor email?',
      description: 'description.',
      order: 1,
      required: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const question = EmailQuestion.restore(props);

    expect(question.id).toBe(props.id);
    expect(question.surveyId).toBe(props.surveyId);
    expect(question.title).toBe(props.title);
    expect(question.type).toBe(QuestionType.EMAIL);
    expect(question.description).toBe(props.description);
    expect(question.order).toBe(props.order);
    expect(question.required).toBe(props.required);
    expect(question.createdAt.getTime()).toBe(props.createdAt.getTime());
    expect(question.updatedAt.getTime()).toBe(props.updatedAt.getTime());
    expect(question.deletedAt?.getTime()).toBe(props.deletedAt.getTime());
  });
});
