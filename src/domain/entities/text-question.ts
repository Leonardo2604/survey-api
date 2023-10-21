import { randomUUID } from 'crypto';

import { Question, QuestionProps } from './question';
import { QuestionType } from '../enums/question-type';
import { Optional } from '@/core/types/optional';
import { TextQuestionValidator } from '@/infra/validators/zod/text-question.validator';
import { Validator } from '@/core/validator/validator';

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
    const question = new TextQuestion({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    question.validate();

    return question;
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

  protected get validator(): Validator<TextQuestion> {
    return new TextQuestionValidator();
  }

  changeMinLength(minLength?: number) {
    this.props.minLength = minLength;
    this.validate();
    this.touch();
  }

  changeMaxLength(maxLength?: number) {
    this.props.maxLength = maxLength;
    this.validate();
    this.touch();
  }

  changeIsLongText(isLongText: boolean) {
    this.props.isLongText = isLongText;
    this.validate();
    this.touch();
  }
}
