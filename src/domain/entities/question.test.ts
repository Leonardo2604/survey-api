import { QuestionType } from '../enums/question-type';
import { Question, QuestionProps } from './question';

class Stub extends Question {
  static create(props: QuestionProps) {
    return new Stub(props);
  }
}

describe('Question', () => {
  it('Should be able to create a question', () => {
    const props = {
      id: '123',
      surveyId: '9cf621ec-6f6c-43f7-8dd8-6e4872933018',
      title: 'Qual o seu nome?',
      description: 'description.',
      order: 1,
      type: QuestionType.TEXT,
      required: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const stub = Stub.create(props);

    expect(stub.id).toBe(props.id);
    expect(stub.surveyId).toBe(props.surveyId);
    expect(stub.title).toBe(props.title);
    expect(stub.description).toBe(props.description);
    expect(stub.order).toBe(props.order);
    expect(stub.type).toBe(QuestionType.TEXT);
    expect(stub.required).toBe(props.required);
    expect(stub.createdAt.getTime()).toBe(props.createdAt.getTime());
    expect(stub.updatedAt.getTime()).toBe(props.updatedAt.getTime());
    expect(stub.deletedAt?.getTime()).toBe(props.deletedAt.getTime());
  });

  it('Should be able to change the question title', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      surveyId: '9cf621ec-6f6c-43f7-8dd8-6e4872933018',
      title: 'Qual o seu nome?',
      description: 'description.',
      order: 1,
      type: QuestionType.TEXT,
      required: true,
      createdAt: pastDate,
      updatedAt: pastDate,
      deletedAt: pastDate,
    };

    const stub = Stub.create(props);
    const validateSpy = vi.spyOn(stub, 'validate');

    const newTitle = 'new title';

    stub.changeTitle(newTitle);

    expect(stub.title).toBe(newTitle);
    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(stub.updatedAt.getTime()).toBeGreaterThan(props.updatedAt.getTime());
  });

  it('Should be able to change the question description', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      surveyId: '9cf621ec-6f6c-43f7-8dd8-6e4872933018',
      title: 'Qual o seu nome?',
      description: 'description.',
      order: 1,
      type: QuestionType.TEXT,
      required: true,
      createdAt: pastDate,
      updatedAt: pastDate,
      deletedAt: pastDate,
    };

    const stub = Stub.create(props);

    const validateSpy = vi.spyOn(stub, 'validate');

    const newDescription = 'new description';

    stub.changeDescription(newDescription);

    expect(stub.description).toBe(newDescription);
    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(stub.updatedAt.getTime()).toBeGreaterThan(props.updatedAt.getTime());
  });
});
