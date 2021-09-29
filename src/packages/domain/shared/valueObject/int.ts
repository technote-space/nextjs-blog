import isInt from 'validator/lib/isInt';
import Float from '$/domain/shared/valueObject/float';

export default abstract class Int extends Float {
  protected fromInput(value: number | string): number {
    return Math.floor(super.fromInput(value));
  }

  public validate(value: number | string): string[] | undefined {
    const results = super.validate(value);
    if (results?.length) {
      return results;
    }

    if (typeof value === 'string' && !isInt(value)) {
      return ['整数の形式が正しくありません'];
    }

    const num = this.fromInput(value);
    if (!Number.isSafeInteger(num)) {
      return ['有効な整数ではありません'];
    }

    return undefined;
  }
}
