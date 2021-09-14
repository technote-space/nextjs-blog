import dayjs from 'dayjs';
import isDate from 'validator/lib/isDate';
import Base from '$/domain/post/valueObject/base';

export default abstract class Date extends Base<string, dayjs.Dayjs>() {
  protected fromInput(value: string) {
    return dayjs(value);
  }

  protected validate(value: string): string[] | undefined {
    if (!isDate(value)) {
      return ['日付の形式が正しくありません'];
    }

    return undefined;
  }

  public compare(value: this): number {
    if (this.value.isBefore(value.value)) {
      return -1;
    }

    if (this.value.isAfter(value.value)) {
      return 1;
    }

    return 0;
  }
}
