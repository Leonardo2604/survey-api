import { Question, QuestionProps } from './question';
import { QuestionType } from '../enums/question-type';
import { randomUUID } from 'crypto';

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
    return new ColorQuestion({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static restore(props: ColorQuestionProps) {
    return new ColorQuestion(props);
  }
}
