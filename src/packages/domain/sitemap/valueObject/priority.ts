import Float from '$/domain/shared/valueObject/float';

export default class Priority extends Float {
  public getName(): string {
    return '優先度';
  }

  protected getMaxNumber(): number | undefined {
    return 1;
  }

  protected getMinNumber(): number | undefined {
    return 0;
  }
}
