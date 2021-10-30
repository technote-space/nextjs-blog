import type { Settings } from '$/domain/app/settings';
import type { Props, Params, IPostPageProps } from '$/domain/pages/post';
import type { IPostFactory } from '$/domain/post/factory';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { singleton, inject } from 'tsyringe';
import { fromEntity } from '$/domain/post/dto/postDetail';
import { Post } from '$/domain/post/entity/post';
import Id from '$/domain/post/valueObject/id';
import NotFoundException from '$/domain/shared/exceptions/notFound';

@singleton()
export class PostPageProps implements IPostPageProps {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('IPostFactory') private postFactory: IPostFactory,
  ) {
  }

  public async getStaticPaths(postType: string): Promise<GetStaticPathsResult<Params>> {
    if (this.settings.isIsr) {
      return {
        paths: [],
        fallback: 'blocking',
      };
    }

    return {
      paths: (await this.postFactory.getIds(postType)).map(id => ({
        params: { id: id.value },
      })),
      fallback: false,
    };
  }

  public async getStaticProps(params?: Params, postType?: string): Promise<GetStaticPropsResult<Props>> {
    if (!params) {
      return {
        notFound: true,
      };
    }

    try {
      const post = await this.postFactory.fetch(Id.create(params.id), postType);
      return {
        props: {
          post: await fromEntity(post),
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
    } catch (e) {
      if (e instanceof NotFoundException) {
        return {
          notFound: true,
        };
      }

      throw e;
    }
  }
}
