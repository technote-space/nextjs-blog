import type { ILayoutComponent } from '$/domain/app/layout';
import type { IPostPage, Props, Params, IPostPageProps } from '$/domain/pages/post';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type { IPostManager } from '$/domain/post/manager';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import type { VFC } from 'react';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import Id from '$/domain/post/valueObject/id';
import NotFoundException from '$/domain/shared/exceptions/notFound';
import View from '$/infra/pages/post/view';
import { fromEntity, toEntity } from '$/infra/post/dto/postDetail';

@singleton()
export class PostPage implements IPostPage {
  public constructor(
    @inject('ILayoutComponent') private layoutComponent: ILayoutComponent,
  ) {
  }

  private static getSeoProps(entity: PostDetail) {
    return {
      title: entity.getTitle().value,
      description: entity.getExcerpt().value,
      image: entity.getThumbnail()?.value,
      canonical: `/posts/${entity.getId().value}`,
    };
  }

  public create(): VFC<Props> {
    const component = memo(({ post }: Props) => {
      const entity = toEntity(post);
      return this.layoutComponent.render(
        {
          seo: PostPage.getSeoProps(entity),
        },
        <View post={entity}/>,
      );
    });
    component.displayName = 'PostPage';

    return component;
  }
}

@singleton()
export class PostPageProps implements IPostPageProps {
  public constructor(
    @inject('IPostManager') private postManager: IPostManager,
  ) {
  }

  public async getStaticPaths(): Promise<GetStaticPathsResult<Params>> {
    return {
      paths: (await this.postManager.getIds()).map(id => ({
        params: { id: id.value },
      })),
      fallback: false,
    };
  }

  public async getStaticProps(params?: Params): Promise<GetStaticPropsResult<Props>> {
    if (!params) {
      throw new NotFoundException;
    }

    return {
      props: {
        post: await fromEntity(await this.postManager.fetch(Id.create(params.id))),
      },
    };
  }
}
