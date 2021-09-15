import Base from '$/domain/shared/valueObject/base';

export default abstract class StringId extends Base<number | string, string>() {
  protected fromInput(value: number | string) {
    return `${value}`;
  }

  public validate(value: number | string): string[] | undefined {
    const text = this.fromInput(value);
    if (!text.length) {
      return ['値を指定してください'];
    }

    return undefined;
  }

  public compare(value: this): number {
    return this.value.localeCompare(value.value);
  }
}
