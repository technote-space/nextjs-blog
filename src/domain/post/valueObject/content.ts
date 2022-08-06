import Text from '@technote-space/vo-entity-ts/dist/valueObject/text';

export default class Content extends Text {
  protected get symbol() {
    return Symbol();
  }

  public static getName(): string {
    return '内容';
  }

  protected getValidationMaxLength(): number | undefined {
    return 100000;
  }
}
