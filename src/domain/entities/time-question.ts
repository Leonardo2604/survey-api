import { randomUUID } from 'crypto';

import { Question, QuestionProps } from './question';
import { QuestionType } from '../enums/question-type';

interface Props {
  min?: string;
  max?: string;
}

type TimeQuestionProps = Omit<QuestionProps & Props, 'type'>;

type NewInstance = Omit<
  TimeQuestionProps,
  'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class TimeQuestion extends Question<Props> {
  private constructor(props: TimeQuestionProps) {
    super({
      ...props,
      type: QuestionType.TIME,
    });
  }

  static create(props: NewInstance) {
    return new TimeQuestion({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static restore(props: TimeQuestionProps) {
    return new TimeQuestion(props);
  }

  get min() {
    return this.props.min;
  }

  get max() {
    return this.props.max;
  }

  changeMin(min?: string) {
    this.props.min = min;
    this.touch();
  }

  changeMax(max?: string) {
    this.props.max = max;
    this.touch();
  }
}
