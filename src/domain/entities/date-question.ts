import { randomUUID } from 'node:crypto';

import { Question, QuestionProps } from './question';
import { QuestionType } from '../enums/question-type';
import { DateQuestionValidator } from '@/infra/validators/zod/date-question.validator';
import { Validator } from '@/core/validator/validator';

interface Props {
  min?: Date;
  max?: Date;
}

type DateQuestionProps = Omit<QuestionProps & Props, 'type'>;

type NewInstance = Omit<
  DateQuestionProps,
  'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class DateQuestion extends Question<Props> {
  private constructor(props: DateQuestionProps) {
    super({
      ...props,
      type: QuestionType.DATE,
    });
  }

  static create(props: NewInstance) {
    const question = new DateQuestion({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    question.validate();

    return question;
  }

  static restore(props: DateQuestionProps) {
    return new DateQuestion(props);
  }

  protected get validator(): Validator<DateQuestion> {
    return new DateQuestionValidator();
  }

  get min() {
    return this.props.min;
  }

  get max() {
    return this.props.max;
  }

  changeMin(min?: Date) {
    this.props.min = min;
    this.validate();
    this.touch();
  }

  changeMax(max?: Date) {
    this.props.max = max;
    this.validate();
    this.touch();
  }
}
