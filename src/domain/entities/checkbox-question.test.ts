import { QuestionType } from '../enums/question-type';
import { CheckboxQuestion } from './checkbox-question';
import { QuestionOption } from './question-option';

describe('CheckboxQuestion', () => {
  it('Should be able to create a checkbox question', () => {
    const props = {
      surveyId: '123',
      title: 'Qual a cor deve aparecer no banner?',
      description: 'description.',
      order: 1,
      required: true,
    };

    const question = CheckboxQuestion.create(props);

    expect(question.id).toBeDefined();
    expect(question.surveyId).toBe(props.surveyId);
    expect(question.title).toBe(props.title);
    expect(question.type).toBe(QuestionType.CHECKBOX);
    expect(question.description).toBe(props.description);
    expect(question.order).toBe(props.order);
    expect(question.required).toBe(props.required);
    expect(question.options).toHaveLength(0);
    expect(question.createdAt).toBeDefined();
    expect(question.updatedAt).toBeDefined();
    expect(question.deletedAt).toBeUndefined();
  });

  it('Should be able to restore a checkbox question', () => {
    const props = {
      id: '123',
      surveyId: '123',
      title: 'Qual a cor deve aparecer no banner?',
      description: 'description.',
      order: 1,
      required: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const question = CheckboxQuestion.restore(props);

    expect(question.id).toBe(props.id);
    expect(question.surveyId).toBe(props.surveyId);
    expect(question.title).toBe(props.title);
    expect(question.type).toBe(QuestionType.CHECKBOX);
    expect(question.description).toBe(props.description);
    expect(question.options).toHaveLength(0);
    expect(question.order).toBe(props.order);
    expect(question.required).toBe(props.required);
    expect(question.createdAt.getTime()).toBe(props.createdAt.getTime());
    expect(question.updatedAt.getTime()).toBe(props.updatedAt.getTime());
    expect(question.deletedAt?.getTime()).toBe(props.deletedAt.getTime());
  });

  it('Should be able to add a question option', () => {
    const props = {
      id: '123',
      surveyId: '123',
      title: 'Qual a cor deve aparecer no banner?',
      description: 'description.',
      order: 1,
      required: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const question = CheckboxQuestion.restore(props);

    question.addOption(
      QuestionOption.create({
        title: 'Option 1',
        order: 1,
        questionId: question.id,
        value: '2',
      }),
    );

    expect(question.options).toHaveLength(1);
  });

  it('Should be able to remove a question option', () => {
    const props = {
      id: '123',
      surveyId: '123',
      title: 'Qual a cor deve aparecer no banner?',
      description: 'description.',
      order: 1,
      required: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const question = CheckboxQuestion.restore(props);

    const option = QuestionOption.create({
      title: 'Option 1',
      order: 1,
      questionId: question.id,
      value: '2',
    });

    question.addOption(option);

    question.removeOption(option);

    expect(question.options).toHaveLength(0);
  });
});
