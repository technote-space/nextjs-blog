import Date from '@technote-space/vo-entity-ts/dist/valueObject/date';

export default class CreatedAt extends Date {
  protected get symbol() {
    return Symbol();
  }

  public static getName(): string {
    return '作成日時';
  }
}
