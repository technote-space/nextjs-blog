import pluralize from 'pluralize';
import StringId from '$/domain/shared/valueObject/stringId';

export default class PostType extends StringId {
  public getName(): string {
    return '投稿タイプ';
  }

  public get pluralized(): string {
    return pluralize(this.value);
  }

  public static readonly DEFAULT_POST_TYPE = 'post';
}
