import Text from '@technote-space/vo-entity-ts/dist/valueObject/text';

export default class Name extends Text {
  protected get symbol() {
    return Symbol();
  }

  public static getName(): string {
    return '名前';
  }

  protected getValidationMaxLength(): number | undefined {
    return 32;
  }
}
