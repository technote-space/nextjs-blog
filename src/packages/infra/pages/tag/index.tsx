import type { ILayoutComponent } from '$/domain/app/layout';
import type { ITagPage, Props } from '$/domain/pages/tag';
import type { VFC } from 'react';
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

  public create(): VFC<Props> {
    const component = memo((props: Props) => this.layoutComponent.render(props, <View {...useHooks(props)} />));
    component.displayName = 'TagPage';

    return component;
  }
}
