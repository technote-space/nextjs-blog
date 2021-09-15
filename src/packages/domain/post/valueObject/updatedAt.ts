import Date from '$/domain/shared/valueObject/date';

export default class UpdatedAt extends Date {
  public getName(): string {
    return '更新日時';
  }
}
