import Base from '$/domain/post/valueObject/base';

export default abstract class Text extends Base<number | string, string>() {
  protected fromInput(value: number | string) {
    return `${value}`;
  }

  protected getValidationMinLength(): number | undefined {
    return undefined;
  }

  protected getValidationMaxLength(): number | undefined {
    return undefined;
  }

  protected validate(value: number | string): string[] | undefined {
    const text = this.fromInput(value);
    const results: string[] = [];
    const min = this.getValidationMinLength();
    if (min && text.length < min) {
      results.push(`${min}文字より長く入力してください`);
    }

    const max = this.getValidationMaxLength();
    if (max && text.length > max) {
      results.push(`${max}文字より短く入力してください`);
    }

    return results;
  }

  public compare(value: this): number {
    return this.value.localeCompare(value.value);
  }
}
