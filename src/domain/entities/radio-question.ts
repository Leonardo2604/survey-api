import { randomUUID } from 'crypto';

import { Question, QuestionProps } from './question';
import { QuestionType } from '../enums/question-type';
import { QuestionOption } from './question-option';
import { Optional } from '@/core/types/optional';

interface Props {
  options: QuestionOption[];
}

type RadioQuestionProps = Optional<
  Omit<QuestionProps & Props, 'type'>,
  'options'
>;

type NewInstance = Omit<
  RadioQuestionProps,
  'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class RadioQuestion extends Question<Props> {
  private constructor(props: RadioQuestionProps) {
    super({
      ...props,
      type: QuestionType.RADIO,
      options: props.options ?? [],
    });
  }

  static create(props: NewInstance) {
    return new RadioQuestion({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static restore(props: RadioQuestionProps) {
    return new RadioQuestion(props);
  }

  get options() {
    return this.props.options;
  }

  addOption(option: QuestionOption) {
    this.props.options.push(option);
  }

  removeOption(option: QuestionOption) {
    this.props.options = this.options.filter((o) => o.id !== option.id);
  }
}