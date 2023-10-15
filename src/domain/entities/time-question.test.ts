import { QuestionType } from '../enums/question-type';
import { TimeQuestion } from './time-question';

describe('TimeQuestion', () => {
  it('Should be able to create a time question', () => {
    const props = {
      surveyId: '123',
      title: 'Que horas gostaria de ser atendido?',
      description: 'description',
      order: 1,
      min: '09:00',
      max: '18:00',
      required: true,
    };

    const question = TimeQuestion.create(props);

    expect(question.id).toBeDefined();
    expect(question.surveyId).toBe(props.surveyId);
    expect(question.title).toBe(props.title);
    expect(question.type).toBe(QuestionType.TIME);
    expect(question.description).toBe(props.description);
    expect(question.order).toBe(props.order);
    expect(question.min).toBe(props.min);
    expect(question.max).toBe(props.max);
    expect(question.required).toBe(props.required);
    expect(question.createdAt).toBeDefined();
    expect(question.updatedAt).toBeDefined();
    expect(question.deletedAt).toBeUndefined();
  });

  it('Should be able to restore a time question', () => {
    const props = {
      id: '123',
      surveyId: '123',
      title: 'Que horas gostaria de ser atendido?',
      description: 'description.',
      order: 1,
      min: '09:00',
      max: '18:00',
      required: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const question = TimeQuestion.restore(props);

    expect(question.id).toBe(props.id);
    expect(question.surveyId).toBe(props.surveyId);
    expect(question.title).toBe(props.title);
    expect(question.description).toBe(props.description);
    expect(question.order).toBe(props.order);
    expect(question.type).toBe(QuestionType.TIME);
    expect(question.min).toBe(props.min);
    expect(question.max).toBe(props.max);
    expect(question.required).toBe(props.required);
    expect(question.createdAt.getTime()).toBe(props.createdAt.getTime());
    expect(question.updatedAt.getTime()).toBe(props.updatedAt.getTime());
    expect(question.deletedAt?.getTime()).toBe(props.deletedAt.getTime());
  });

  it('Should be able to change the time question min value', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      surveyId: '123',
      title: 'Que horas gostaria de ser atendido?',
      description: 'description.',
      order: 1,
      min: '09:00',
      max: '18:00',
      required: true,
      createdAt: pastDate,
      updatedAt: pastDate,
    };

    const question = TimeQuestion.restore(props);

    const newMin = '08:00';

    question.changeMin(newMin);

    expect(question.min).toBe(newMin);
    expect(question.updatedAt.getTime()).toBeGreaterThan(
      props.updatedAt.getTime(),
    );
  });

  it('Should be able to change the Date question max value', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      surveyId: '123',
      title: 'Que horas gostaria de ser atendido?',
      description: 'description.',
      order: 1,
      min: '09:00',
      max: '18:00',
      required: true,
      createdAt: pastDate,
      updatedAt: pastDate,
    };

    const question = TimeQuestion.restore(props);

    const newMax = '17:00';

    question.changeMax(newMax);

    expect(question.max).toBe(newMax);
    expect(question.updatedAt.getTime()).toBeGreaterThan(
      props.updatedAt.getTime(),
    );
  });
});
