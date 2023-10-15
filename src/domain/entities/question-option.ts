import { randomUUID } from 'crypto';

interface Props {
  id: string;
  questionId: string;
  title: string;
  value: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

type NewInstance = Omit<Props, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export class QuestionOption {
  private props: Props;

  private constructor(props: Props) {
    this.props = { ...props };
  }

  static create(props: NewInstance) {
    return new QuestionOption({
      ...props,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static restore(props: Props) {
    return new QuestionOption(props);
  }

  get id() {
    return this.props.id;
  }

  get questionId() {
    return this.props.questionId;
  }

  get title() {
    return this.props.title;
  }

  get value() {
    return this.props.value;
  }

  get order() {
    return this.props.order;
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

  private touch() {
    this.props.updatedAt = new Date();
  }

  changeTitle(title: string) {
    this.props.title = title;
    this.touch();
  }

  changeValue(value: string) {
    this.props.value = value;
    this.touch();
  }

  delete() {
    this.props.deletedAt = new Date();
  }
}
