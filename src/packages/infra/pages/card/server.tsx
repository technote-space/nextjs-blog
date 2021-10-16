import type { Settings } from '$/domain/app/settings';
import type { Params, ICardPageProps } from '$/domain/pages/card';
import type { IPostFactory } from '$/domain/post/factory';
import type { IColorService } from '$/domain/post/service/color';
import type { ICache } from '$/domain/shared/library/cache';
import type { ISlack } from '$/domain/shared/library/slack';
import type { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import ReactDOMServer from 'react-dom/server';
import { singleton, inject } from 'tsyringe';
import urlMetadata from 'url-metadata';
import { escapeHtml } from '@/lib/helpers/string';
import { getSiteUrl } from '@/lib/helpers/url';
import BlogCard from './components/BlogCard';

@singleton()
export class CardPageProps implements ICardPageProps {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('IPostFactory') private postFactory: IPostFactory,
    @inject('IColorService') private color: IColorService,
    @inject('ISlack') private slack: ISlack,
    @inject('ICache') private cache: ICache,
  ) {
  }

  private getBlogCard(url: string): () => Promise<string> {
    return async () => {
      try {
        const metadata = await urlMetadata(url) as urlMetadata.Result & { 'zenn:description'?: string };
        const description = metadata.description.length > 120 ? `${metadata.description.substr(0, 120)}...` : metadata.description;
        const image = metadata.image || `https://s.wordpress.com/mshots/v1/${escapeHtml(url)}?w=380&h=200`;
        const dominantColor = await this.color.getDominantColor(image, getSiteUrl(url));
        return ReactDOMServer.renderToString(<BlogCard
          url={url}
          title={metadata.title}
          description={description}
          image={image}
          dominantColor={dominantColor?.value}
          canonical={metadata.canonical}
          source={metadata.source}
        />);
      } catch (e) {
        console.log(e);
        if (e instanceof Error && /getaddrinfo ENOTFOUND/.test(e.message)) {
          // ドメインも死んでるっぽい
          if (!/test\.invalid/.test(url)) {
            this.slack.sendError(e).then();
          }

          return `<span style="text-decoration: line-through">${url}</span>`;
        }

        return ReactDOMServer.renderToString(<BlogCard
          url={url}
          image={`https://s.wordpress.com/mshots/v1/${escapeHtml(url)}?w=380&h=200`}
        />);
      }
    };
  }

  public async getServerSideProps({
    res,
    params,
  }: GetServerSidePropsContext<Params>): Promise<GetServerSidePropsResult<{}>> {   // eslint-disable-line @typescript-eslint/ban-types
    if (!params?.url) {
      return {
        notFound: true,
      };
    }

    res.statusCode = 200;
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.setHeader('Content-Type', 'text/html');
    res.write(await this.cache.getOrGenerate(`blog-card::${params.url}`, this.getBlogCard(params.url), 600));
    res.end();

    return {
      props: {},
    };
  }
}
