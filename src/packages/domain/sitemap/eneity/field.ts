import Base from '$/domain/shared/entity/base';
import Changefreq from '$/domain/sitemap/valueObject/changefreq';
import Lastmod from '$/domain/sitemap/valueObject/lastmod';
import Loc from '$/domain/sitemap/valueObject/loc';
import Priority from '$/domain/sitemap/valueObject/priority';

export class Field extends Base {
  private loc!: Loc;
  private lastmod?: Lastmod;
  private changefreq?: Changefreq;
  private priority?: Priority;

  public static reconstruct(loc: Loc, lastmod?: Lastmod, changefreq?: Changefreq, priority?: Priority): Field {
    const instance = new this();
    instance.loc = loc;
    instance.lastmod = lastmod;
    instance.changefreq = changefreq;
    instance.priority = priority;

    return instance;
  }

  public getLoc(): Loc {
    return this.loc;
  }

  public getLastMod(): Lastmod | undefined {
    return this.lastmod;
  }

  public getChangefreq(): Changefreq | undefined {
    return this.changefreq;
  }

  public getPriority(): Priority | undefined {
    return this.priority;
  }
}
