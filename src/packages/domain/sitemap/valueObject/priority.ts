import Float from '@technote-space/vo-entity-ts/dist/valueObject/float';

export default class Priority extends Float {
  protected get symbol() {
    return Symbol();
  }

  public static getName(): string {
    return '優先度';
  }

  protected getMaxNumber(): number | undefined {
    return 1;
  }

  protected getMinNumber(): number | undefined {
    return 0;
  }
}
