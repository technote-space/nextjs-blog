import dayjs from 'dayjs';
import isDate from 'validator/lib/isDate';
import Base from '$/domain/shared/valueObject/base';

// Inner type = string: consider serialization
export default abstract class Date extends Base<dayjs.ConfigType, dayjs.Dayjs, string>() {
  protected fromInput(value: dayjs.ConfigType): string {
    return dayjs(value).toISOString();
  }

  protected toOutput(value: string): dayjs.Dayjs {
    return dayjs(value);
  }

  public validate(value: dayjs.ConfigType): string[] | undefined {
    if (typeof value === 'string' && !isDate(value)) {
      return ['日付の形式が正しくありません'];
    }

    return undefined;
  }

  public compare(value: this): number {
    if (this.value.isSame(value.value)) {
      return 0;
    }

    if (this.value.isBefore(value.value)) {
      return -1;
    }

    return 1;
  }
}
