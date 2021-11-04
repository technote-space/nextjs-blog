import StringId from '$/domain/shared/valueObject/stringId';

export default class Slug extends StringId {
  public getName(): string {
    return 'タグID';
  }
}
