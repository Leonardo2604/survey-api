import { Entity } from '@/core/entities/entity';
import { Validator } from '@/core/validator/validator';
import { UUID } from '@/core/value-objects/uuid.ov';
import { QuestionOptionValidator } from '@/infra/validators/zod/question-option.validator';

interface Props {
  id: UUID;
  questionId: UUID;
  title: string;
  value: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

type NewInstance = Omit<Props, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export class QuestionOption extends Entity<Props> {
  private props: Props;

  private constructor(props: Props) {
    super();

    this.props = { ...props };
  }

  static create(props: NewInstance) {
    const option = new QuestionOption({
      ...props,
      id: new UUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    option.validate();

    return option;
  }

  static restore(props: Props) {
    return new QuestionOption(props);
  }

  protected get validator(): Validator<QuestionOption> {
    return new QuestionOptionValidator();
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
    this.validate();
    this.touch();
  }

  changeValue(value: string) {
    this.props.value = value;
    this.validate();
    this.touch();
  }

  delete() {
    this.props.deletedAt = new Date();
  }

  getIdentity(): UUID {
    return this.props.id;
  }

  toJSON(): Props {
    return this.props;
  }
}
