import Text from '$/domain/shared/valueObject/text';

export default class Name extends Text {
  public getName(): string {
    return '名前';
  }

  protected getValidationMaxLength(): number | undefined {
    return 32;
  }
}
