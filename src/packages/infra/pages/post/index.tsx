import type { ILayoutComponent } from '$/domain/app/layout';
import type { Settings } from '$/domain/app/settings';
import type { IPostPage, Props } from '$/domain/pages/post';
import type { VFC } from 'react';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import { useHooks } from '$/infra/pages/post/hooks';
import View from '$/infra/pages/post/view';

@singleton()
export class PostPage implements IPostPage {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('ILayoutComponent') private layoutComponent: ILayoutComponent,
  ) {
  }

  public create(): VFC<Props> {
    const component = memo((props: Props) => {
      const { layoutProps, viewProps } = useHooks(props, this.settings);
      return this.layoutComponent.render(layoutProps, <View {...viewProps}/>);
    });
    component.displayName = 'PostPage';

    return component;
  }
}
