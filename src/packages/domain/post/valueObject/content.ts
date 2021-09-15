import Text from '$/domain/shared/valueObject/text';

export default class Content extends Text {
  public getName(): string {
    return '内容';
  }

  protected getValidationMaxLength(): number | undefined {
    return 100000;
  }
}
