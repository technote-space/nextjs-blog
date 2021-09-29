import type { Settings } from '$/domain/app/settings';
import type { IRobotsPageProps } from '$/domain/pages/robots';
import type { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import { singleton, inject } from 'tsyringe';

@singleton()
export class RobotsPageProps implements IRobotsPageProps {
  public constructor(
    @inject('Settings') private settings: Settings,
  ) {
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async getServerSideProps({ res }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> {
    const robotsTxt = `# *
User-agent: *
Allow: /

# Host
Host: ${this.settings.siteUrl}

# Sitemaps
Sitemap: ${this.settings.siteUrl.replace(/\/$/, '')}/sitemap.xml
`;

    res.statusCode = 200;
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.setHeader('Content-Type', 'text/plain');
    res.end(robotsTxt);

    return {
      props: {},
    };
  }
}
