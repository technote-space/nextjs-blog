import Url from '$/domain/shared/valueObject/url';

export default class Loc extends Url {
  public getName(): string {
    return 'ページURL';
  }
}
