import isNumeric from 'validator/lib/isNumeric';
import Base from '$/domain/shared/valueObject/base';

export default abstract class Float extends Base<number | string, number>() {
  protected fromInput(value: number | string) {
    if (typeof value === 'number') {
      return value;
    }

    return parseFloat(value);
  }

  public validate(value: number | string): string[] | undefined {
    if (typeof value === 'string' && !isNumeric(value)) {
      return ['数値の形式が正しくありません'];
    }

    return undefined;
  }

  public compare(value: this): number {
    return this.value - value.value;
  }
}
