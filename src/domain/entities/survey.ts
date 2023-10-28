import { Entity } from '@/core/entities/entity';
import { Validator } from '@/core/validator/validator';
import { UUID } from '@/core/value-objects/uuid.ov';
import { SurveyValidator } from '@/infra/validators/zod/survey.validator';
import { Question } from './question';

export interface Props {
  id: UUID;
  title: string;
  description: string;
  isClosed: boolean;
  questions: Question[];
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

  private constructor(props: Props) {
    super();

    this.props = { ...props };
  }

  static create(props: NewInstance) {
    const entity = new Survey({
      ...props,
      id: new UUID(),
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

  get questions() {
    return this.props.questions;
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

  protected get validator(): Validator<this> {
    return new SurveyValidator();
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

  addQuestion(question: Question) {
    this.props.questions.push(question);
  }

  removeQuestion(question: Question) {
    this.props.questions = this.props.questions.filter(
      (q) => q.id !== question.id,
    );
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

  getIdentity(): UUID {
    return this.props.id;
  }

  toJSON(): Props {
    return this.props;
  }
}
