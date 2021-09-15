import StringId from '$/domain/shared/valueObject/stringId';

export default class Source extends StringId {
  public getName(): string {
    return '情報源';
  }
}
