import Entity from '@technote-space/vo-entity-ts/dist/entity';
import Changefreq from '@/domain/sitemap/valueObject/changefreq';
import Lastmod from '@/domain/sitemap/valueObject/lastmod';
import Loc from '@/domain/sitemap/valueObject/loc';
import Priority from '@/domain/sitemap/valueObject/priority';

export class Field extends Entity {
  public constructor(
    public readonly loc: Loc,
    public readonly lastmod: Lastmod | undefined,
    public readonly changefreq: Changefreq | undefined,
    public readonly priority: Priority | undefined,
  ) {
    super();
  }

  public static reconstruct(loc: Loc, lastmod?: Lastmod, changefreq?: Changefreq, priority?: Priority): Field {
    return Field._reconstruct(loc, lastmod, changefreq, priority);
  }

  public equals(other: Field): boolean {
    return this.loc.equals(other.loc);
  }
}
