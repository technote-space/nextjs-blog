import isInt from 'validator/lib/isInt';
import Base from '$/domain/shared/valueObject/base';

export default abstract class Int extends Base<number | string, number>() {
  protected fromInput(value: number | string) {
    if (typeof value === 'number') {
      return value;
    }

    return parseInt(value);
  }

  public validate(value: number | string): string[] | undefined {
    if (typeof value === 'string' && !isInt(value)) {
      return ['整数の形式が正しくありません'];
    }

    const num = this.fromInput(value);
    if (!Number.isSafeInteger(num)) {
      return ['有効な整数ではありません'];
    }

    return undefined;
  }

  public compare(value: this): number {
    return this.value - value.value;
  }
}
