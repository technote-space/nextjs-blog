import type { ILayoutComponent } from '$/domain/app/layout';
import type { Settings } from '$/domain/app/settings';
import type { IPostPage, Props, Params, IPostPageProps } from '$/domain/pages/post';
import type { IPostManager } from '$/domain/post/manager';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import type { VFC } from 'react';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import Id from '$/domain/post/valueObject/id';
import NotFoundException from '$/domain/shared/exceptions/notFound';
import { useHooks } from '$/infra/pages/post/hooks';
import View from '$/infra/pages/post/view';
import { fromEntity } from '$/infra/post/dto/postDetail';

@singleton()
export class PostPage implements IPostPage {
  public constructor(
    @inject('ILayoutComponent') private layoutComponent: ILayoutComponent,
  ) {
  }

  public create(): VFC<Props> {
    const component = memo((props: Props) => {
      const { layoutProps, viewProps } = useHooks(props);
      return this.layoutComponent.render(layoutProps, <View {...viewProps}/>);
    });
    component.displayName = 'PostPage';

    return component;
  }
}

@singleton()
export class PostPageProps implements IPostPageProps {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('IPostManager') private postManager: IPostManager,
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
      paths: (await this.postManager.getIds(postType)).map(id => ({
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
      const post = await this.postManager.fetch(Id.create(params.id), postType);
      return {
        props: {
          post: await fromEntity(post),
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
