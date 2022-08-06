import StringId from '@technote-space/vo-entity-ts/dist/valueObject/stringId';

export default class Slug extends StringId {
  protected get symbol() {
    return Symbol();
  }

  public static getName(): string {
    return 'Slug';
  }
}
