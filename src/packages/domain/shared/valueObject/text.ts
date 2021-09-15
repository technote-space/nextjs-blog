import Base from '$/domain/shared/valueObject/base';

export default abstract class Text extends Base<number | string, string>() {
  protected fromInput(value: number | string): string {
    if (typeof value === 'number') {
      return `${value}`;
    }

    if (value) {
      return value;
    }

    return '';
  }

  protected getValidationMinLength(): number | undefined {
    return undefined;
  }

  protected getValidationMaxLength(): number | undefined {
    return undefined;
  }

  public validate(value: number | string): string[] | undefined {
    const text = this.fromInput(value);
    const results: string[] = [];

    if (!text.length) {
      results.push('値を指定してください');
    } else {
      const min = this.getValidationMinLength();
      if (min && text.length < min) {
        results.push(`${min}文字より長く入力してください`);
      }
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
