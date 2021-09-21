import Text from '$/domain/shared/valueObject/text';

export default class Excerpt extends Text {
  public getName(): string {
    return '抜粋';
  }

  // TODO: Add test code
  private static removeUrl(text: string): string {
    return text.replace(/\[?(https?:)?\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+]?/ig, '');
  }

  protected fromInput(value: number | string): string {
    const text = super.fromInput(value);
    const excerpt = Excerpt.removeUrl(text).substr(0, 120);
    if (text.length !== excerpt.length) {
      return `${excerpt}...`;
    }

    return text;
  }
}
