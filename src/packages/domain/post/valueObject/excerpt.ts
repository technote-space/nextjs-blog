import Text from '$/domain/shared/valueObject/text';

export default class Excerpt extends Text {
  public getName(): string {
    return '抜粋';
  }

  protected fromInput(value: number | string): string {
    const text = super.fromInput(value);
    const excerpt = text.substr(0, 100);
    if (text.length !== excerpt.length) {
      return `${excerpt}...`;
    }

    return text;
  }
}
