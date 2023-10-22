import { randomUUID } from 'crypto';

import { Question, QuestionProps } from './question';
import { QuestionType } from '../enums/question-type';

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
    const question = new EmailQuestion({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    question.validate();

    return question;
  }

  static restore(props: EmailQuestionProps) {
    return new EmailQuestion(props);
  }
}
