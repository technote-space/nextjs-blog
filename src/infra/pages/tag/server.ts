import type { Settings } from '@/domain/app/settings';
import type { ITagPageProps, Props, Params } from '@/domain/pages/tag';
import type { ITagPagedPageProps } from '@/domain/pages/tag/paged';
import type { IPostFactory } from '@/domain/post/factory';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { singleton, inject } from 'tsyringe';

@singleton()
export class TagPageProps implements ITagPageProps {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('IPostFactory') private postFactory: IPostFactory,
    @inject('ITagPagedPageProps') private tagPagedPageProps: ITagPagedPageProps,
  ) {
  }

  public async getStaticPaths(postType: string | undefined): Promise<GetStaticPathsResult<Params>> {
    if (this.settings.isIsr) {
      return {
        paths: [],
        fallback: 'blocking',
      };
    }

    return {
      paths: (await this.postFactory.tags(postType)).map(tag => ({
        params: { tag: tag.slug.value },
      })),
      fallback: false,
    };
  }

  public async getStaticProps(postType: string | undefined, params?: Params): Promise<GetStaticPropsResult<Props>> {
    if (!params) {
      return {
        notFound: true,
      };
    }
    return this.tagPagedPageProps.getStaticProps(postType, {
      ...params,
      page: '1',
    });
  }
}
