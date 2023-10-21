import { EntityValidationError } from '@/core/errors/entity-validation-error';
import { Survey } from './survey';

describe('Survey', () => {
  it('Should be able to create a survey', () => {
    const props = {
      title: 'Survey title',
      description: 'Survey description',
    };

    const survey = Survey.create(props);

    expect(survey.id).toBeDefined();
    expect(survey.title).toBe(props.title);
    expect(survey.description).toBe(props.description);
    expect(survey.isClosed).toBeFalsy();
    expect(survey.isOpen).toBeTruthy();
    expect(survey.createdAt).toBeDefined();
    expect(survey.updatedAt).toBeDefined();
    expect(survey.deletedAt).toBeUndefined();
  });

  it('Should not be able to create an invalid survey', () => {
    expect(() => {
      const props = {
        title: 't'.repeat(121),
        description: 'd'.repeat(257),
      };

      Survey.create(props);
    }).toThrow(EntityValidationError);
  });

  it('Should be able to restore a survey', () => {
    const props = {
      id: '123',
      title: 'Survey title',
      description: 'Survey description',
      isClosed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
    };

    const survey = Survey.restore(props);

    expect(survey.id).toBe(props.id);
    expect(survey.title).toBe(props.title);
    expect(survey.description).toBe(props.description);
    expect(survey.isClosed).toBe(props.isClosed);
    expect(survey.createdAt.getTime()).toBe(props.createdAt.getTime());
    expect(survey.updatedAt.getTime()).toBe(props.updatedAt.getTime());
    expect(survey.deletedAt?.getTime()).toBe(props.deletedAt?.getTime());
  });

  it('Should be able to close a survey', () => {
    const props = {
      title: 'Survey title',
      description: 'Survey description',
    };

    const survey = Survey.create(props);

    survey.close();

    expect(survey.isClosed).toBeTruthy();
    expect(survey.isOpen).toBeFalsy();
  });

  it('Should be able to open a survey', () => {
    const props = {
      id: '123',
      title: 'Survey title',
      description: 'Survey description',
      isClosed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const survey = Survey.restore(props);

    survey.open();

    expect(survey.isClosed).toBeFalsy();
  });

  it('Should be able to delete a survey', () => {
    const props = {
      id: '123',
      title: 'Survey title',
      description: 'Survey description',
      isClosed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const survey = Survey.restore(props);

    survey.delete();

    expect(survey.deletedAt).toBeDefined();
  });

  it('Should be able to change the survey title', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      title: 'Survey title',
      description: 'Survey description',
      isClosed: true,
      createdAt: pastDate,
      updatedAt: pastDate,
    };

    const survey = Survey.restore(props);

    const validateSpy = vi.spyOn(survey, 'validate');

    const newTitle = 'Survey new title';

    survey.changeTitle(newTitle);

    expect(survey.title).toBe(newTitle);
    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(survey.updatedAt.getTime()).toBeGreaterThan(
      props.updatedAt.getTime(),
    );
  });

  it('Should be able to change the survey description', () => {
    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 3);

    const props = {
      id: '123',
      title: 'Survey title',
      description: 'Survey description',
      isClosed: true,
      createdAt: pastDate,
      updatedAt: pastDate,
    };

    const survey = Survey.restore(props);

    const validateSpy = vi.spyOn(survey, 'validate');

    const newDescription = 'Survey new description';

    survey.changeDescription(newDescription);

    expect(survey.description).toBe(newDescription);
    expect(validateSpy).toHaveBeenCalledTimes(1);
    expect(survey.updatedAt.getTime()).toBeGreaterThan(
      props.updatedAt.getTime(),
    );
  });
});
