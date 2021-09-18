import Url from '$/domain/shared/valueObject/url';

export default class Thumbnail extends Url {
  public getName(): string {
    return 'サムネイル';
  }
}
