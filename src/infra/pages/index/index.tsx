import type { ILayoutComponent } from '@/domain/app/layout';
import type { IIndexPage, Props } from '@/domain/pages';
import type { HookProps } from '@/infra/pages/index/hooks';
import type { FC } from 'react';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import { useHooks } from '@/infra/pages/index/hooks';
import View from '@/infra/pages/index/view';

@singleton()
export class IndexPage implements IIndexPage {
  public constructor(
    @inject('ILayoutComponent') private layoutComponent: ILayoutComponent,
  ) {
  }

  private static getPath(page: number): string {
    return `/page/${page}/`;
  }

  private static getProps(props: Props): HookProps {
    return {
      ...props,
      path: IndexPage.getPath,
    };
  }

  public create(): FC<Props> {
    const component = memo((props: Props) => {
      const { layoutProps, viewProps } = useHooks(IndexPage.getProps(props));
      return this.layoutComponent.render(layoutProps, <View {...viewProps} />);
    });
    component.displayName = 'IndexPage';

    return component;
  }
}
