import type { Settings } from '$/domain/app/settings';
import type { ITagPageProps, Props, Params } from '$/domain/pages/tag';
import type { IPostFactory } from '$/domain/post/factory';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { singleton, inject } from 'tsyringe';
import { fromEntity as fromPostEntity } from '$/domain/post/dto/post';
import { fromEntity as fromTagEntity } from '$/domain/post/dto/tag';
import { Post } from '$/domain/post/entity/post';

@singleton()
export class TagPageProps implements ITagPageProps {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('IPostFactory') private postFactory: IPostFactory,
  ) {
  }

  public async getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
    if (this.settings.isIsr) {
      return {
        paths: [],
        fallback: 'blocking',
      };
    }

    return {
      paths: (await this.postFactory.tags()).map(tag => ({
        params: { tag: tag.getSlug().value },
      })),
      fallback: false,
    };
  }

  public async getStaticProps(params?: Params): Promise<GetStaticPropsResult<Props>> {
    const tag = params?.tag ? (await this.postFactory.tags()).find(tag => tag.getSlug().value === params.tag) : undefined;
    if (!tag) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        posts: (await this.postFactory.all(undefined, params)).map(post => fromPostEntity(post)),
        tag: fromTagEntity(tag),
        headerPages: (this.settings.pages?.header ?? []).map(page => ({
          label: page.title,
          url: Post.createUrlFromPostData(page, this.settings),
        })),
        footerPages: (this.settings.pages?.footer ?? []).map(page => ({
          label: page.title,
          url: Post.createUrlFromPostData(page, this.settings),
        })),
      },
      revalidate: this.settings.isIsr ? (this.settings.isrRevalidate ?? 60) : undefined,
    };
  }
}
