import type { ISitemapPageProps } from '@/domain/pages/sitemap';
import type { ICache } from '@/domain/shared/library/cache';
import type { ISitemap } from '@/domain/sitemap';
import type { GetStaticPropsResult } from 'next';
import fs from 'fs';
import { SitemapBuilder } from 'next-sitemap';
import { singleton, inject } from 'tsyringe';

@singleton()
export class SitemapPageProps implements ISitemapPageProps {
  public constructor(
    @inject('ICache') private cache: ICache,
    @inject('ISitemap') private sitemap: ISitemap,
  ) {
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async getStaticProps(): Promise<GetStaticPropsResult<{}>> {
    const sitemapXml = new SitemapBuilder().buildSitemapXml((await this.sitemap.getFields()).map(field => ({
      loc: field.loc.value,
      lastmod: field.lastmod?.value.format('YYYY-MM-DD'),
      changefreq: field.changefreq?.value,
      priority: field.priority?.value,
    })));
    console.log(fs.readdirSync('.'));
    fs.writeFileSync('public/sitemap.xml', sitemapXml);

    return { props: {} };
  }
}
