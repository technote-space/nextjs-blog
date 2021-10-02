import isNumeric from 'validator/lib/isNumeric';
import Base from '$/domain/shared/valueObject/base';

export default abstract class Float extends Base<number | string, number>() {
  protected fromInput(value: number | string): number {
    if (typeof value === 'number') {
      return value;
    }

    let num = parseFloat(value);

    const max = this.getMaxNumber();
    if (max !== undefined && num > max && this.isTruncateMode()) {
      num = Math.min(max, num);
    }

    const min = this.getMinNumber();
    if (min !== undefined && num < min && this.isTruncateMode()) {
      num = Math.max(min, num);
    }

    return num;
  }

  protected getMaxNumber(): number | undefined {
    return undefined;
  }

  protected getMinNumber(): number | undefined {
    return undefined;
  }

  protected isTruncateMode(): boolean {
    return false;
  }

  public validate(value: number | string): string[] | undefined {
    if (typeof value === 'string' && !isNumeric(value)) {
      return ['数値の形式が正しくありません'];
    }

    const num = this.fromInput(value);

    const max = this.getMaxNumber();
    if (max !== undefined && num > max) {
      return [`${max}以下の値を入力してください`];
    }

    const min = this.getMinNumber();
    if (min !== undefined && num < min) {
      return [`${min}以上の値を入力してください`];
    }

    return undefined;
  }

  public compare(value: this): number {
    return this.value - value.value;
  }
}
