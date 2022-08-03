import Text from '@technote-space/vo-entity-ts/dist/valueObject/text';

export default class DominantColor extends Text {
  protected get symbol() {
    return Symbol();
  }

  public static getName(): string {
    return 'ドミナントカラー';
  }

  protected getValidationMaxLength(): number | undefined {
    return 32;
  }
}
