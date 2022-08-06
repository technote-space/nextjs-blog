import Date from '@technote-space/vo-entity-ts/dist/valueObject/date';

export default class Lastmod extends Date {
  protected get symbol() {
    return Symbol();
  }

  public static getName(): string {
    return '最終更新日';
  }
}
