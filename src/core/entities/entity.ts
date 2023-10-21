export abstract class Entity<Props> {
  abstract validate(entity: this): void;
  abstract toJSON(): Props;
}
