import StringId from '@technote-space/vo-entity-ts/dist/valueObject/stringId';
import pluralize from 'pluralize';

export default class PostType extends StringId {
  protected get symbol() {
    return Symbol();
  }

  public static getName(): string {
    return '投稿タイプ';
  }

  public get pluralized(): string {
    return pluralize(this.value);
  }

  public static readonly DEFAULT_POST_TYPE = 'post';
}
