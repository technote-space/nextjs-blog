import Text from '@technote-space/vo-entity-ts/dist/valueObject/text';

export default class Title extends Text {
  protected get symbol() {
    return Symbol();
  }

  public static getName(): string {
    return 'タイトル';
  }

  protected getValidationMaxLength(): number | undefined {
    return 255;
  }
}
