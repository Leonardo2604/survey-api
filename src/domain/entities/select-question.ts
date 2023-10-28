import { Question, QuestionProps } from './question';
import { QuestionType } from '../enums/question-type';
import { QuestionOption } from './question-option';
import { Optional } from '@/core/types/optional';
import { UUID } from '@/core/value-objects/uuid.ov';

interface Props {
  options: QuestionOption[];
}

type SelectQuestionProps = Optional<
  Omit<QuestionProps & Props, 'type'>,
  'options'
>;

type NewInstance = Omit<
  SelectQuestionProps,
  'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class SelectQuestion extends Question<Props> {
  private constructor(props: SelectQuestionProps) {
    super({
      ...props,
      type: QuestionType.SELECT,
      options: props.options ?? [],
    });
  }

  static create(props: NewInstance) {
    const question = new SelectQuestion({
      ...props,
      id: new UUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    question.validate();

    return question;
  }

  static restore(props: SelectQuestionProps) {
    return new SelectQuestion(props);
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
