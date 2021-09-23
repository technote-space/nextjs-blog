import type { ILayoutComponent } from '$/domain/app/layout';
import type { IPostPage, Props, Params, Paths, IPostPageProps } from '$/domain/pages/post';
import type { IPostManager } from '$/domain/post/manager';
import type { VFC } from 'react';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import Id from '$/domain/post/valueObject/id';
import NotFoundException from '$/domain/shared/exceptions/notFound';
import View from '$/infra/pages/post/view';
import { fromEntity } from '$/infra/post/dto/postDetail';

@singleton()
export class PostPage implements IPostPage {
  public constructor(
    @inject('ILayoutComponent') private layoutComponent: ILayoutComponent,
  ) {
  }

  public create(): VFC<Props> {
    const component = memo(({ post }: Props) => {
      return this.layoutComponent.render({
        seo: {
          title: post.title,
          description: post.excerpt,
          image: post.thumbnail ?? undefined,
          canonical: post.url,
        },
      }, <View post={post}/>);
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

  public async getStaticPaths(): Promise<Paths> {
    return {
      paths: (await this.postManager.getIds()).map(id => ({
        params: { id: id.value },
      })),
      fallback: false,
    };
  }

  public async getStaticProps(params?: Params): Promise<Props> {
    if (!params) {
      throw new NotFoundException;
    }

    return {
      post: await fromEntity(await this.postManager.fetch(Id.create(params.id))),
    };
  }
}
