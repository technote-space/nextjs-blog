import isURL from 'validator/lib/isURL';
import Base from '$/domain/shared/valueObject/base';

export default abstract class Url extends Base<string, string>() {
  public validate(): string[] | undefined {
    if (!isURL(this.input)) {
      return ['URLの形式が正しくありません'];
    }

    return undefined;
  }

  public compare(value: this): number {
    return this.value.localeCompare(value.value);
  }
}
