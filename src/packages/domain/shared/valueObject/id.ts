import Int from '$/domain/shared/valueObject/int';

export default abstract class Id extends Int {
  public validate(value: number | string): string[] | undefined {
    const result = super.validate(value);
    if (result?.length) {
      return result;
    }

    const num = this.fromInput(value);
    if (num < 1) {
      return ['１以上を指定してください'];
    }

    return undefined;
  }
}
