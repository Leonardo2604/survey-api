import { Question, QuestionProps } from './question';
import { QuestionType } from '../enums/question-type';
import { randomUUID } from 'crypto';
import { Optional } from '@/core/types/optional';

interface Props {
  isLongText: boolean;
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

  get isLongText() {
    return this.props.isLongText;
  }

  changeIsLongText(isLongText: boolean) {
    this.props.isLongText = isLongText;
    this.touch();
  }
}
