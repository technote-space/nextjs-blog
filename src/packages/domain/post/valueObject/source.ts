import StringId from '@technote-space/vo-entity-ts/dist/valueObject/stringId';

export default class Source extends StringId {
  protected get symbol() {
    return Symbol();
  }

  public static getName(): string {
    return '情報源';
  }
}
