import { QuestionType } from '../enums/question-type';
import { TextQuestion } from './text-question';

describe('TextQuestion', () => {
  it('Should be able to create a text question', () => {
    const props = {
      surveyId: '123',
      title: 'Qual o seu nome?',
      description: 'description.',
      order: 1,
      maxLength: 64,
      minLength: 16,
      required: true,
    };

    const question = TextQuestion.create(props);

    expect(question.id).toBeDefined();
    expect(question.surveyId).toBe(props.surveyId);
    expect(question.title).toBe(props.title);
    expect(question.type).toBe(QuestionType.TEXT);
    expect(question.description).toBe(props.description);
    expect(question.order).toBe(props.order);
    expect(question.minLength).toBe(props.minLength);
    expect(question.maxLength).toBe(props.maxLength);
    expect(question.required).toBe(props.required);
    expect(question.createdAt).toBeDefined();
    expect(question.updatedAt).toBeDefined();
    expect(question.deletedAt).toBeUndefined();
  });

  it('Should be able to create a text question with minimal information', () => {
    const props = {
      surveyId: '123',
      title: 'Qual o seu nome?',
      order: 1,
    };

    const question = TextQuestion.create(props);

    expect(question.description).toBe('');
    expect(question.minLength).toBeUndefined();
    expect(question.maxLength).toBeUndefined();
    expect(question.required).toBeFalsy();
  });

  it('Should be able to restore a text question', () => {
    const props = {
      id: '123',
      surveyId: '123',
      title: 'Qual o seu nome?',
      description: 'description.',
      order: 1,
      maxLength: 64,
      minLength: 16,
      required: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const question = TextQuestion.restore(props);

    expect(question.id).toBe(props.id);
    expect(question.surveyId).toBe(props.surveyId);
    expect(question.title).toBe(props.title);
    expect(question.description).toBe(props.description);
    expect(question.order).toBe(props.order);
    expect(question.type).toBe(QuestionType.TEXT);
    expect(question.minLength).toBe(props.minLength);
    expect(question.maxLength).toBe(props.maxLength);
    expect(question.required).toBe(props.required);
    expect(question.createdAt.getTime()).toBe(props.createdAt.getTime());
    expect(question.updatedAt.getTime()).toBe(props.updatedAt.getTime());
    expect(question.deletedAt?.getTime()).toBe(props.deletedAt.getTime());
  });

  it('Should be able to delete a question', () => {
    const props = {
      surveyId: '123',
      title: 'Qual o seu nome?',
      order: 1,
    };

    const question = TextQuestion.create(props);

    question.delete();

    expect(question.deletedAt).toBeDefined();
  });

  it('Should be able to change the question title', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      surveyId: '123',
      title: 'Qual o seu nome?',
      description: 'description.',
      order: 1,
      maxLength: 64,
      minLength: 16,
      required: true,
      createdAt: pastDate,
      updatedAt: pastDate,
    };

    const question = TextQuestion.restore(props);

    const newTitle = 'new title';

    question.changeTitle(newTitle);

    expect(question.title).toBe(newTitle);
    expect(question.updatedAt.getTime()).toBeGreaterThan(
      props.updatedAt.getTime(),
    );
  });

  it('Should be able to change the question description', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      surveyId: '123',
      title: 'Qual o seu nome?',
      description: 'description.',
      order: 1,
      maxLength: 64,
      minLength: 16,
      required: true,
      createdAt: pastDate,
      updatedAt: pastDate,
    };

    const question = TextQuestion.restore(props);

    const newDescription = 'new description';

    question.changeDescription(newDescription);

    expect(question.description).toBe(newDescription);
    expect(question.updatedAt.getTime()).toBeGreaterThan(
      props.updatedAt.getTime(),
    );
  });

  it('Should be able to change the text question min length', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      surveyId: '123',
      title: 'Qual o seu nome?',
      description: 'description.',
      order: 1,
      maxLength: 64,
      minLength: 16,
      required: true,
      createdAt: pastDate,
      updatedAt: pastDate,
    };

    const question = TextQuestion.restore(props);

    const newMinLength = 12;

    question.changeMinLength(newMinLength);

    expect(question.minLength).toBe(newMinLength);
    expect(question.updatedAt.getTime()).toBeGreaterThan(
      props.updatedAt.getTime(),
    );
  });

  it('Should be able to change the text question max length', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      surveyId: '123',
      title: 'Qual o seu nome?',
      description: 'description.',
      order: 1,
      maxLength: 64,
      minLength: 16,
      required: true,
      createdAt: pastDate,
      updatedAt: pastDate,
    };

    const question = TextQuestion.restore(props);

    const newMaxLength = 80;

    question.changeMaxLength(newMaxLength);

    expect(question.maxLength).toBe(newMaxLength);
    expect(question.updatedAt.getTime()).toBeGreaterThan(
      props.updatedAt.getTime(),
    );
  });
});
