import type { ILayoutComponent } from '$/domain/app/layout';
import type { Settings } from '$/domain/app/settings';
import type { IIndexPage, IIndexPageProps, Props } from '$/domain/pages';
import type { IPostManager } from '$/domain/post/manager';
import type { GetStaticPropsResult } from 'next';
import type { VFC } from 'react';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import View from '$/infra/pages/index/view';
import { fromEntity, toEntity } from '$/infra/post/dto/post';

@singleton()
export class IndexPage implements IIndexPage {
  public constructor(
    @inject('ILayoutComponent') private layoutComponent: ILayoutComponent,
  ) {
  }

  public create(): VFC<Props> {
    const component = memo(({ posts }: Props) => {
      return this.layoutComponent.render({}, <View posts={posts.map(post => toEntity(post))}/>);
    });
    component.displayName = 'IndexPage';

    return component;
  }
}

@singleton()
export class IndexPageProps implements IIndexPageProps {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('IPostManager') private postManager: IPostManager,
  ) {
  }

  public async getStaticProps(): Promise<GetStaticPropsResult<Props>> {
    return {
      props: {
        posts: (await this.postManager.all()).map(post => fromEntity(post)),
      },
      revalidate: this.settings.isIsr ? (this.settings.isrRevalidate ?? 60) : undefined,
    };
  }
}
