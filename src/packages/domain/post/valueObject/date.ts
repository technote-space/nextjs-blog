import dayjs from 'dayjs';
import isDate from 'validator/lib/isDate';
import Base from '$/domain/post/valueObject/base';

export default abstract class Date extends Base<string, dayjs.Dayjs>() {
  protected process(value: string) {
    return dayjs(value);
  }

  protected validate(value: string): string[] | undefined {
    if (!isDate(value)) {
      return ['日付の形式が正しくありません'];
    }

    return undefined;
  }
}
