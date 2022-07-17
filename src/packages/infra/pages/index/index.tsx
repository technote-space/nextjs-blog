import type { ILayoutComponent } from '$/domain/app/layout';
import type { IIndexPage, Props } from '$/domain/pages';
import type { FC } from 'react';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import { useHooks } from '$/infra/pages/index/hooks';
import View from '$/infra/pages/index/view';

@singleton()
export class IndexPage implements IIndexPage {
  public constructor(
    @inject('ILayoutComponent') private layoutComponent: ILayoutComponent,
  ) {
  }

  public create(): FC<Props> {
    const component = memo((props: Props) => this.layoutComponent.render(props, <View {...useHooks(props)} />));
    component.displayName = 'IndexPage';

    return component;
  }
}
