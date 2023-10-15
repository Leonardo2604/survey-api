import { Question, QuestionProps } from './question';
import { QuestionType } from '../enums/question-type';
import { randomUUID } from 'crypto';

interface Props {
  minLength?: number;
  maxLength?: number;
}

type TextQuestionProps = Omit<QuestionProps & Props, 'type'>;

type NewInstance = Omit<
  TextQuestionProps,
  'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class TextQuestion extends Question<Props> {
  private constructor(props: TextQuestionProps) {
    super({
      ...props,
      type: QuestionType.TEXT,
    });
  }

  static create(props: NewInstance) {
    return new TextQuestion({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static restore(props: TextQuestionProps) {
    return new TextQuestion(props);
  }

  get minLength() {
    return this.props.minLength;
  }

  get maxLength() {
    return this.props.maxLength;
  }

  changeMinLength(minLength?: number) {
    this.props.minLength = minLength;
    this.touch();
  }

  changeMaxLength(maxLength?: number) {
    this.props.maxLength = maxLength;
    this.touch();
  }
}
