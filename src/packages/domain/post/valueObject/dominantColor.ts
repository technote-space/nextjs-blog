import Text from '$/domain/shared/valueObject/text';

export default class DominantColor extends Text {
  public getName(): string {
    return 'ドミナントカラー';
  }

  protected getValidationMaxLength(): number | undefined {
    return 32;
  }
}
