import Text from '@technote-space/vo-entity-ts/dist/valueObject/text';

export default class Excerpt extends Text {
  protected get symbol() {
    return Symbol();
  }

  public static getName(): string {
    return '抜粋';
  }

  private static removeUrl(text: string): string {
    return text.replace(/\[?(https?:)?\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+]?/ig, '');
  }

  protected fromInput(): string {
    const text = super.fromInput().replace(/\r?\n/g, ' ');
    const excerpt = Excerpt.removeUrl(text).trim().replace(/\s{2,}/, ' ').substr(0, 120);
    if (text.length !== excerpt.length && excerpt.length >= 120) {
      return `${excerpt}...`;
    }

    return excerpt;
  }
}
