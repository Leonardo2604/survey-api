import { randomUUID } from 'crypto';

import { Question, QuestionProps } from './question';
import { QuestionType } from '../enums/question-type';
import { Optional } from '@/core/types/optional';

interface Props {
  isLongText: boolean;
  minLength?: number;
  maxLength?: number;
}

type TextQuestionProps = Optional<
  Omit<QuestionProps & Props, 'type'>,
  'isLongText'
>;

type NewInstance = Omit<
  TextQuestionProps,
  'id' | 'type' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class TextQuestion extends Question<Props> {
  private constructor(props: TextQuestionProps) {
    super({
      ...props,
      isLongText: props.isLongText ?? false,
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

  get isLongText() {
    return this.props.isLongText;
  }

  changeMinLength(minLength?: number) {
    this.props.minLength = minLength;
    this.touch();
  }

  changeMaxLength(maxLength?: number) {
    this.props.maxLength = maxLength;
    this.touch();
  }

  changeIsLongText(isLongText: boolean) {
    this.props.isLongText = isLongText;
    this.touch();
  }
}
