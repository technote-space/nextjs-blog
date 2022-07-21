import type { ILayoutComponent } from '$/domain/app/layout';
import type { ITagPage, Props } from '$/domain/pages/tag';
import type { HookProps } from '$/infra/pages/index/hooks';
import type { FC } from 'react';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import { useHooks } from '$/infra/pages/index/hooks';
import View from '$/infra/pages/index/view';

@singleton()
export class TagPage implements ITagPage {
  public constructor(
    @inject('ILayoutComponent') private layoutComponent: ILayoutComponent,
  ) {
  }

  private static getPath(tag: string | undefined, page: number): string {
    return `/tags/${tag}/${page}/`;
  }

  private static getProps(props: Props): HookProps {
    return {
      ...props,
      path: page => TagPage.getPath(props.tag?.slug, page),
    };
  }

  public create(): FC<Props> {
    const component = memo((props: Props) => {
      const { layoutProps, viewProps } = useHooks(TagPage.getProps(props));
      return this.layoutComponent.render(layoutProps, <View {...viewProps} />);
    });
    component.displayName = 'TagPage';

    return component;
  }
}
