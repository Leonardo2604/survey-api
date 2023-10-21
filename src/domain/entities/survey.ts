import { Entity } from '@/core/entities/entity';
import { EntityValidationError } from '@/core/errors/entity-validation-error';
import { Validator } from '@/core/validator/validator';
import { SurveyValidator } from '@/infra/validators/zod/survey.validator';
import { randomUUID } from 'node:crypto';

export interface Props {
  id: string;
  title: string;
  description: string;
  isClosed: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

type NewInstance = Omit<
  Props,
  'id' | 'isClosed' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;

export class Survey extends Entity<Props> {
  private props: Props;
  private validator: Validator<Survey>;

  private constructor(props: Props) {
    super();

    this.props = { ...props };
    this.validator = new SurveyValidator();
  }

  static create(props: NewInstance) {
    const entity = new Survey({
      ...props,
      id: randomUUID(),
      isClosed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    entity.validate();

    return entity;
  }

  static restore(props: Props) {
    return new Survey(props);
  }

  get id() {
    return this.props.id;
  }

  get title() {
    return this.props.title;
  }

  get description() {
    return this.props.description;
  }

  get isClosed() {
    return this.props.isClosed;
  }

  get isOpen() {
    return !this.props.isClosed;
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

  open() {
    this.props.isClosed = false;
    this.touch();
  }

  close() {
    this.props.isClosed = true;
    this.touch();
  }

  delete() {
    this.props.deletedAt = new Date();
  }

  changeTitle(title: string) {
    this.props.title = title;
    this.validate();
    this.touch();
  }

  changeDescription(description: string) {
    this.props.description = description;
    this.validate();
    this.touch();
  }

  validate() {
    const validation = this.validator.validate(this);

    if (validation.failed()) {
      throw new EntityValidationError(validation.getErrors());
    }
  }

  toJSON(): Props {
    return this.props;
  }
}
