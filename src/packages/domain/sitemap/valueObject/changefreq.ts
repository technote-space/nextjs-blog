import Flags from '$/domain/shared/valueObject/flags';

export default class Changefreq extends Flags<'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'>() {
  public getName(): string {
    return '更新頻度';
  }
}
