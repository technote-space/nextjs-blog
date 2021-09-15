import Date from '$/domain/shared/valueObject/date';

export default class CreatedAt extends Date {
  public getName(): string {
    return '作成日時';
  }
}
