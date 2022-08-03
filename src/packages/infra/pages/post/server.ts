import type { Settings } from '$/domain/app/settings';
import type { Props, Params, IPostPageProps } from '$/domain/pages/post';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type { IPostFactory } from '$/domain/post/factory';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { singleton, inject } from 'tsyringe';
import { fromEntity as fromPostEntity } from '$/domain/post/dto/post';
import { fromEntity as fromPostDetailEntity } from '$/domain/post/dto/postDetail';
import { Post } from '$/domain/post/entity/post';
import Id from '$/domain/post/valueObject/id';
import Source from '$/domain/post/valueObject/source';
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
      paths: (await this.postFactory.all(postType)).flatMap(post => {
        const sources = [...new Set([
          post.id.source.value,
          ...(this.settings.derivedSources && this.settings.derivedSources[post.id.source.value] ? this.settings.derivedSources[post.id.source.value] : []),
        ])];

        return sources.map(source => ({
          params: { id: Id.create({ source: Source.create(source), id: post.id.postId }).value },
        }));
      }),
      fallback: false,
    };
  }

  public async getStaticProps(postType: string | undefined, params?: Params): Promise<GetStaticPropsResult<Props>> {
    if (!params) {
      return {
        notFound: true,
      };
    }

    const id = Id.create(params.id);
    const sources = [...new Set([
      id.source.value,
      ...(this.settings.derivedSources ? Object.keys(this.settings.derivedSources).filter(key => this.settings.derivedSources![key].includes(id.source.value)) : []),
    ])];
    const fetch = async (id: Id, index = 0): Promise<PostDetail> => {
      try {
        const _id = Id.create({ source: Source.create(sources[index]), id: id.postId });
        return await this.postFactory.fetch(_id, postType);
      } catch (e) {
        if (index < sources.length - 1) return await fetch(id, index + 1);
        throw e;
      }
    };

    try {
      const post = await fetch(id);
      const all = Post.isDefaultPostType(postType, this.settings) ? await this.postFactory.all(postType) : [];
      const index = all.findIndex(post => post.id.equals(id));
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
