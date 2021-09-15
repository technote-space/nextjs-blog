import Text from '$/domain/shared/valueObject/text';

export default class Title extends Text {
  public getName(): string {
    return 'タイトル';
  }

  protected getValidationMaxLength(): number | undefined {
    return 255;
  }
}
