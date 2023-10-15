import { Question, QuestionProps } from './question';
import { QuestionType } from '../enums/question-type';
import { randomUUID } from 'crypto';

type EmailQuestionProps = Omit<QuestionProps, 'type'>;

type NewInstance = Omit<
  EmailQuestionProps,
  'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class EmailQuestion extends Question {
  private constructor(props: EmailQuestionProps) {
    super({
      ...props,
      type: QuestionType.EMAIL,
    });
  }

  static create(props: NewInstance) {
    return new EmailQuestion({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static restore(props: EmailQuestionProps) {
    return new EmailQuestion(props);
  }
}
