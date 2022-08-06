import Flags from '@technote-space/vo-entity-ts/dist/valueObject/flags';

export default class Changefreq extends Flags<'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'> {
  protected get symbol() {
    return Symbol();
  }

  public get flagTypes(): ('always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never')[] {
    return ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
  }

  public static getName(): string {
    return '更新頻度';
  }
}
