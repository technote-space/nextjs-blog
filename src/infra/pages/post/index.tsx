import type { ILayoutComponent } from '@/domain/app/layout';
import type { Settings } from '@/domain/app/settings';
import type { IDarkMode } from '@/domain/app/theme/darkMode';
import type { IPostPage, Props } from '@/domain/pages/post';
import type { FC } from 'react';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import { useHooks } from '@/infra/pages/post/hooks';
import View from '@/infra/pages/post/view';

@singleton()
export class PostPage implements IPostPage {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('ILayoutComponent') private layoutComponent: ILayoutComponent,
    @inject('IDarkMode') private darkMode: IDarkMode,
  ) {
  }

  public create(): FC<Props> {
    const component = memo((props: Props) => {
      const { layoutProps, viewProps } = useHooks(props, this.settings, this.darkMode);
      return this.layoutComponent.render(layoutProps, <View {...viewProps}/>);
    });
    component.displayName = 'PostPage';

    return component;
  }
}
