import type { Settings } from '$/domain/app/settings';
import type { Props, Params, ICardPageProps } from '$/domain/pages/card';
import type { IPostFactory } from '$/domain/post/factory';
import type { IColorService } from '$/domain/post/service/color';
import type { ISlack } from '$/domain/shared/library/slack';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { singleton, inject } from 'tsyringe';
import urlMetadata from 'url-metadata';
import { escapeHtml } from '@/lib/helpers/string';
import { getSiteUrl } from '@/lib/helpers/url';

@singleton()
export class CardPageProps implements ICardPageProps {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('IPostFactory') private postFactory: IPostFactory,
    @inject('IColorService') private color: IColorService,
    @inject('ISlack') private slack: ISlack,
  ) {
  }

  public async getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  public async getStaticProps(params?: Params): Promise<GetStaticPropsResult<Props>> {
    if (!params) {
      return {
        notFound: true,
      };
    }

    try {
      const metadata = await urlMetadata(params.url) as urlMetadata.Result & { 'zenn:description'?: string };
      const description = metadata.description.length > 120 ? `${metadata.description.substr(0, 120)}...` : metadata.description;
      const image = metadata.image || `https://s.wordpress.com/mshots/v1/${escapeHtml(params.url)}?w=380&h=200`;
      const dominantColor = await this.color.getDominantColor(image, getSiteUrl(params.url));
      return {
        props: {
          ...metadata,
          url: params.url,
          image,
          description,
          dominantColor: dominantColor?.value ?? null,
        },
        revalidate: 60 * 60,
      };
    } catch (e) {
      console.log(e);
      if (e instanceof Error && /getaddrinfo ENOTFOUND/.test(e.message)) {
        // ドメインも死んでるっぽい
        if (!/test\.invalid/.test(params.url)) {
          this.slack.sendError(e).then();
        }

        return {
          props: {
            url: params.url,
            image: null,
            dominantColor: null,
            title: null,
            description: null,
            canonical: null,
            source: null,
          },
          revalidate: 60 * 60,
        };
      }

      return {
        props: {
          url: params.url,
          image: `https://s.wordpress.com/mshots/v1/${escapeHtml(params.url)}?w=380&h=200`,
          dominantColor: null,
          title: null,
          description: null,
          canonical: null,
          source: null,
        },
        revalidate: 60 * 60,
      };
    }
  }
}
