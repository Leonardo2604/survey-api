import { randomUUID } from 'node:crypto';

interface Props {
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

export class Survey {
  private constructor(private props: Props) {}

  static create(props: NewInstance) {
    return new Survey({
      ...props,
      id: randomUUID(),
      isClosed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
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

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get deletedAt() {
    return this.props.deletedAt;
  }

  static restore(props: Props) {
    return new Survey(props);
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
    this.touch();
  }

  changeDescription(description: string) {
    this.props.description = description;
    this.touch();
  }

  isOpen() {
    return !this.isClosed;
  }
}
