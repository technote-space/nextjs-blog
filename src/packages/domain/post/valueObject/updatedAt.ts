import Date from '@technote-space/vo-entity-ts/dist/valueObject/date';

export default class UpdatedAt extends Date {
  protected get symbol() {
    return Symbol();
  }

  public static getName(): string {
    return '更新日時';
  }
}
