import type { Settings } from '$/domain/app/settings';
import type { ITagPagedPageProps, Props, Params } from '$/domain/pages/tag/paged';
import type { IPostFactory } from '$/domain/post/factory';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { singleton, inject } from 'tsyringe';
import { fromEntity } from '$/domain/post/dto/post';
import { fromEntity as fromTagEntity } from '$/domain/post/dto/tag';
import { Post } from '$/domain/post/entity/post';

@singleton()
export class TagPagedPageProps implements ITagPagedPageProps {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('IPostFactory') private postFactory: IPostFactory,
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
      paths: await (await this.postFactory.tags(postType)).reduce(async (prev, tag) => {
        const acc = await prev;
        const totalCount = await this.postFactory.count(postType, { tag: tag.getSlug().value });
        const totalPage = Math.ceil(totalCount / this.settings.perPage);
        return acc.concat([...Array(totalPage).keys()].map(page => ({
          params: { tag: tag.getSlug().value, page: String(page + 1) },
        })));
      }, Promise.resolve([] as { params: { tag: string; page: string } }[])),
      fallback: false,
    };
  }

  public async getStaticProps(postType: string | undefined, params?: Params): Promise<GetStaticPropsResult<Props>> {
    const tag = params?.tag ? (await this.postFactory.tags(postType)).find(tag => tag.getSlug().value === params.tag) : undefined;
    if (!tag) {
      return {
        notFound: true,
      };
    }

    const totalCount = await this.postFactory.count(postType, params);
    const totalPage = Math.ceil(totalCount / this.settings.perPage);
    const page = Math.max(0, Math.min(totalPage - 1, Number(params?.page ?? '1') - 1));

    return {
      props: {
        totalPage,
        page,
        items: (await this.postFactory.paginated({ page }, postType, params)).items.map(post => fromEntity(post)),
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
