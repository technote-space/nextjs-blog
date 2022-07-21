import type { Settings } from '$/domain/app/settings';
import type { IPagedPageProps, Props, Params } from '$/domain/pages/paged';
import type { IPostFactory } from '$/domain/post/factory';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { singleton, inject } from 'tsyringe';
import { fromEntity } from '$/domain/post/dto/post';
import { Post } from '$/domain/post/entity/post';

@singleton()
export class PagedPageProps implements IPagedPageProps {
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

    const totalCount = await this.postFactory.count(postType);
    const totalPage = Math.ceil(totalCount / this.settings.perPage);
    return {
      paths: [...Array(totalPage).keys()].map(page => ({
        params: { page: String(page + 1) },
      })),
      fallback: false,
    };
  }

  public async getStaticProps(postType: string | undefined, params?: Params): Promise<GetStaticPropsResult<Props>> {
    const totalCount = await this.postFactory.count(postType);
    const totalPage = Math.ceil(totalCount / this.settings.perPage);
    const page = Math.max(0, Math.min(totalPage - 1, Number(params?.page ?? '1') - 1));

    return {
      props: {
        totalPage,
        page,
        items: (await this.postFactory.paginated({ page }, postType)).items.map(post => fromEntity(post)),
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
