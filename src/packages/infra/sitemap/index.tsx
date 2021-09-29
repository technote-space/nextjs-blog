import type { Settings } from '$/domain/app/settings';
import type { IPostManager } from '$/domain/post/manager';
import type { ISitemap } from '$/domain/sitemap';
import dayjs from 'dayjs';
import { inject, singleton } from 'tsyringe';
import { Field } from '$/domain/sitemap/eneity/field';
import Changefreq from '$/domain/sitemap/valueObject/changefreq';
import Lastmod from '$/domain/sitemap/valueObject/lastmod';
import Loc from '$/domain/sitemap/valueObject/loc';
import Priority from '$/domain/sitemap/valueObject/priority';
import { getAbsoluteUrl } from '@/lib/helpers/url';

@singleton()
export class Sitemap implements ISitemap {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('IPostManager') private postManager: IPostManager,
  ) {
  }

  public async getFields(): Promise<Field[]> {
    const posts = (await this.postManager.all('post', true)).map(post => Field.reconstruct(
      Loc.create(getAbsoluteUrl(post.getUrl(), this.settings)),
      Lastmod.create((post.getUpdatedAt() ?? post.getCreatedAt()).value),
      Changefreq.create('monthly'),
      Priority.create(1),
    ));
    const pages = (await this.postManager.all('page', true)).map(page => Field.reconstruct(
      Loc.create(getAbsoluteUrl(page.getUrl(), this.settings)),
      Lastmod.create((page.getUpdatedAt() ?? page.getCreatedAt()).value),
      Changefreq.create('yearly'),
      Priority.create(0.3),
    ));
    const lastmod =
      posts.length && pages.length ?
        (posts[0].getLastMod()!.compare(pages[0].getLastMod()!) < 0 ? pages[0].getLastMod()! : posts[0].getLastMod()!).value :
        posts.length ? posts[0].getLastMod()!.value :
          pages.length ? pages[0].getLastMod()!.value :
            dayjs();

    return [
      Field.reconstruct(
        Loc.create(getAbsoluteUrl('/', this.settings)),
        Lastmod.create(lastmod),
        Changefreq.create('weekly'),
        Priority.create(1),
      ),
      ...posts,
      ...pages,
    ];
  }
}
