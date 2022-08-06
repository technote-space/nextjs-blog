import type { ValidationError } from '@technote-space/vo-entity-ts/dist/valueObject';
import valueObject from '@technote-space/vo-entity-ts/dist/valueObject';
import Source from '@/domain/post/valueObject/source';

export type IdProps = string | {
  source: Source;
  id: string | number;
}
type IdPropsInner = {
  source: Source;
  id: string;
}

export default class Id extends valueObject<IdProps, string, IdPropsInner> {
  protected get symbol() {
    return Symbol();
  }

  public static getName(): string {
    return '記事ID';
  }

  protected fromInput(): IdPropsInner {
    if (typeof this.input === 'string') {
      const split = this.input.split('-');
      const source = split.shift();
      return {
        source: Source.create(source!),
        id: split.join('-'),
      };
    }

    return {
      source: this.input.source,
      id: `${this.input.id}`,
    };
  }

  protected toOutput(): string {
    return `${this.inner.source.value}-${this.inner.id}`;
  }

  public getErrors(name: string): ValidationError[] | undefined {
    if (typeof this.input === 'string') {
      const split = this.input.split('-');
      if (split.length < 2) {
        return [{ name, error: '記事IDの形式が正しくありません' }];
      }
    }

    return undefined;
  }

  public compare(value: this): number {
    return this.value.localeCompare(value.value);
  }

  public get source(): Source {
    return this.inner.source;
  }

  public get postId(): string {
    return this.inner.id;
  }
}
