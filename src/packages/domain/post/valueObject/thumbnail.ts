import Url from '@technote-space/vo-entity-ts/dist/valueObject/url';

export default class Thumbnail extends Url {
  protected get symbol() {
    return Symbol();
  }

  public static getName(): string {
    return 'サムネイル';
  }
}
