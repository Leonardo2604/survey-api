import { Question, QuestionProps } from './question';
import { QuestionType } from '../enums/question-type';
import { Validator } from '@/core/validator/validator';
import { TimeQuestionValidator } from '@/infra/validators/zod/time-question.validator';
import { UUID } from '@/core/value-objects/uuid.ov';

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
    const question = new TimeQuestion({
      ...props,
      id: new UUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    question.validate();

    return question;
  }

  static restore(props: TimeQuestionProps) {
    return new TimeQuestion(props);
  }

  protected get validator(): Validator<TimeQuestion> {
    return new TimeQuestionValidator();
  }

  get min() {
    return this.props.min;
  }

  get max() {
    return this.props.max;
  }

  changeMin(min?: string) {
    this.props.min = min;
    this.validate();
    this.touch();
  }

  changeMax(max?: string) {
    this.props.max = max;
    this.validate();
    this.touch();
  }
}
