import { randomUUID } from 'crypto';

import { Question, QuestionProps } from './question';
import { QuestionType } from '../enums/question-type';
import { QuestionOption } from './question-option';
import { Optional } from '@/core/types/optional';

interface Props {
  options: QuestionOption[];
}

type CheckboxQuestionProps = Optional<
  Omit<QuestionProps & Props, 'type'>,
  'options'
>;

type NewInstance = Omit<
  CheckboxQuestionProps,
  'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class CheckboxQuestion extends Question<Props> {
  private constructor(props: CheckboxQuestionProps) {
    super({
      ...props,
      type: QuestionType.CHECKBOX,
      options: props.options ?? [],
    });
  }

  static create(props: NewInstance) {
    return new CheckboxQuestion({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static restore(props: CheckboxQuestionProps) {
    return new CheckboxQuestion(props);
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