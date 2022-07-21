import type { Settings } from '$/domain/app/settings';
import type { Props, Params, IPostPageProps } from '$/domain/pages/post';
import type { IPostFactory } from '$/domain/post/factory';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { singleton, inject } from 'tsyringe';
import { fromEntity as fromPostEntity } from '$/domain/post/dto/post';
import { fromEntity as fromPostDetailEntity } from '$/domain/post/dto/postDetail';
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

  public async getStaticPaths(postType: string | undefined): Promise<GetStaticPathsResult<Params>> {
    if (this.settings.isIsr) {
      return {
        paths: [],
        fallback: 'blocking',
      };
    }

    return {
      paths: (await this.postFactory.all(postType)).map(post => ({
        params: { id: post.getId().value },
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

    try {
      const id = Id.create(params.id);
      const post = await this.postFactory.fetch(Id.create(params.id), postType);
      const all = Post.isDefaultPostType(postType, this.settings) ? await this.postFactory.all(postType) : [];
      const index = all.findIndex(post => post.getId().equals(id));
      return {
        props: {
          post: fromPostDetailEntity(post),
          prev: index > 0 ? fromPostEntity(all[index - 1]) : null,
          next: index < all.length - 1 ? fromPostEntity(all[index + 1]) : null,
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
