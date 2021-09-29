import type { ISitemapPageProps } from '$/domain/pages/sitemap';
import type { ISitemap } from '$/domain/sitemap';
import type { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import { getServerSideSitemap } from 'next-sitemap';
import { singleton, inject } from 'tsyringe';
import { getOrGenerate } from '@/lib/cache';

@singleton()
export class SitemapPageProps implements ISitemapPageProps {
  public constructor(
    @inject('ISitemap') private sitemap: ISitemap,
  ) {
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
    return getServerSideSitemap(context, await getOrGenerate('sitemap', async () => (await this.sitemap.getFields()).map(field => ({
      loc: field.getLoc().value,
      lastmod: field.getLastMod()?.value.format('YYYY-MM-DD'),
      changefreq: field.getChangefreq()?.value,
      priority: field.getPriority()?.value,
    })), 60 * 60));
  }
}
