import type { Settings } from '$/domain/app/settings';
import type { IRobotsPageProps } from '$/domain/pages/robots';
import type { GetStaticPropsResult } from 'next';
import fs from 'fs'
import { singleton, inject } from 'tsyringe';

@singleton()
export class RobotsPageProps implements IRobotsPageProps {
  public constructor(
    @inject('Settings') private settings: Settings,
  ) {
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async getStaticProps(): Promise<GetStaticPropsResult<{}>> {
    const robotsTxt = `# *
User-agent: *
Allow: /

# Host
Host: ${this.settings.siteUrl}

# Sitemaps
Sitemap: ${this.settings.siteUrl.replace(/\/$/, '')}/sitemap.xml
`;
    fs.writeFileSync('public/robots.txt', robotsTxt);

    return { props: {} }
  }
}
