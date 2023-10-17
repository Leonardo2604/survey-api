import { randomUUID } from 'crypto';

import { Question, QuestionProps } from './question';
import { QuestionType } from '../enums/question-type';

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
    return new DateQuestion({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static restore(props: DateQuestionProps) {
    return new DateQuestion(props);
  }

  get min() {
    return this.props.min;
  }

  get max() {
    return this.props.max;
  }

  changeMin(min?: Date) {
    this.props.min = min;
    this.touch();
  }

  changeMax(max?: Date) {
    this.props.max = max;
    this.touch();
  }
}
