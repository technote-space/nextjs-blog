import Date from '$/domain/shared/valueObject/date';

export default class Lastmod extends Date {
  public getName(): string {
    return '最終更新日';
  }
}
