import Int from '$/domain/shared/valueObject/int';

export default abstract class Id extends Int {
  public validate(): string[] | undefined {
    const result = super.validate();
    if (result?.length) {
      return result;
    }

    const num = this.fromInput();
    if (num < 1) {
      return ['１以上を指定してください'];
    }

    return undefined;
  }
}
