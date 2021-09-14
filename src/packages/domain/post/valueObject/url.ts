import isURL from 'validator/lib/isURL';
import Base from '$/domain/post/valueObject/base';

export default abstract class Url extends Base<string, string>() {
  protected fromInput(value: string) {
    return value;
  }

  protected validate(value: string): string[] | undefined {
    if (!isURL(value)) {
      return ['URLの形式が正しくありません'];
    }

    return undefined;
  }

  public compare(value: this): number {
    return this.value.localeCompare(value.value);
  }
}
