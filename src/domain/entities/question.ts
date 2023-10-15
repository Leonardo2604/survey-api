import { Optional } from '@/core/types/optional';
import { QuestionType } from '../enums/question-type';

interface Props {
  id: string;
  surveyId: string;
  title: string;
  description: string;
  type: QuestionType;
  order: number;
  required: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type QuestionProps = Optional<Props, 'required' | 'description'>;

export abstract class Question<T> {
  protected props: Props & T;

  protected constructor(props: QuestionProps & T) {
    this.props = {
      ...props,
      description: props.description ?? '',
      required: props.required ?? false,
    };
  }

  get id() {
    return this.props.id;
  }

  get surveyId() {
    return this.props.surveyId;
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get type() {
    return this.props.type;
  }

  get order() {
    return this.props.order;
  }

  get required() {
    return this.props.required;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }

  protected touch() {
    this.props.updatedAt = new Date();
  }

  delete() {
    this.props.deletedAt = new Date();
  }

  changeTitle(title: string) {
    this.props.title = title;
    this.touch();
  }

  changeDescription(description: string) {
    this.props.description = description;
    this.touch();
  }
}
