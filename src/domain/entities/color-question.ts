import { Question, QuestionProps } from './question';
import { QuestionType } from '../enums/question-type';
import { UUID } from '@/core/value-objects/uuid.ov';

type ColorQuestionProps = Omit<QuestionProps, 'type'>;

type NewInstance = Omit<
  ColorQuestionProps,
  'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class ColorQuestion extends Question {
  private constructor(props: ColorQuestionProps) {
    super({
      ...props,
      type: QuestionType.COLOR,
    });
  }

  static create(props: NewInstance) {
    const question = new ColorQuestion({
      ...props,
      id: new UUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    question.validate();

    return question;
  }

  static restore(props: ColorQuestionProps) {
    return new ColorQuestion(props);
  }
}
