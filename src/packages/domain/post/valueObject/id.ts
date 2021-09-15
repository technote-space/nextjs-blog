import Source from '$/domain/post/valueObject/source';
import Base from '$/domain/shared/valueObject/base';

export type IdProps = string | {
  source: Source;
  id: string | number;
}
type IdPropsInner = {
  source: Source;
  id: string;
}

export default class Id extends Base<IdProps, string, IdPropsInner>() {
  public getName(): string {
    return '記事ID';
  }

  protected fromInput(value: IdProps): IdPropsInner {
    if (typeof value === 'string') {
      const split = value.split('-');
      const source = split.shift();
      return {
        source: Source.create(source!),
        id: split.join('-'),
      };
    }

    return {
      source: value.source,
      id: `${value.id}`,
    };
  }

  protected toOutput(value: IdPropsInner): string {
    return `${value.source.value}-${value.id}`;
  }

  public validate(value: IdProps): string[] | undefined {
    if (typeof value === 'string') {
      const split = value.split('-');
      if (split.length < 2) {
        return ['記事IDの形式が正しくありません'];
      }
    }

    return undefined;
  }

  public compare(value: this): number {
    return this.value.localeCompare(value.value);
  }

  public get source(): Source {
    return this._value.source;
  }

  public get postId(): string {
    return this._value.id;
  }
}
