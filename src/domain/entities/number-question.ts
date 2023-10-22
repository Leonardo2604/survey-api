import { randomUUID } from 'crypto';

import { Question, QuestionProps } from './question';
import { QuestionType } from '../enums/question-type';
import { Validator } from '@/core/validator/validator';
import { NumberQuestionValidator } from '@/infra/validators/zod/number-question.validator';

interface Props {
  min?: number;
  max?: number;
}

type NumberQuestionProps = Omit<QuestionProps & Props, 'type'>;

type NewInstance = Omit<
  NumberQuestionProps,
  'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class NumberQuestion extends Question<Props> {
  private constructor(props: NumberQuestionProps) {
    super({
      ...props,
      type: QuestionType.NUMBER,
    });
  }

  static create(props: NewInstance) {
    const question = new NumberQuestion({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    question.validate();

    return question;
  }

  static restore(props: NumberQuestionProps) {
    return new NumberQuestion(props);
  }

  protected get validator(): Validator<NumberQuestion> {
    return new NumberQuestionValidator();
  }

  get min() {
    return this.props.min;
  }

  get max() {
    return this.props.max;
  }

  changeMin(min?: number) {
    this.props.min = min;
    this.validate();
    this.touch();
  }

  changeMax(max?: number) {
    this.props.max = max;
    this.validate();
    this.touch();
  }
}
