import type { IFooterComponent, Props } from '$/domain/app/layout/footer';
import type { Settings } from '$/domain/app/settings';
import type { VFC } from 'react';
import { memo } from 'react';
import { inject, singleton } from 'tsyringe';
import { useHooks } from '$/infra/app/layout/footer/hooks';
import View from '$/infra/app/layout/footer/view';
import { BaseComponent } from '$/infra/shared/component';

@singleton()
export class FooterComponent extends BaseComponent<Props> implements IFooterComponent {
  public constructor(
    @inject('Settings') private settings: Settings,
  ) {
    super();
  }

  protected getComponent(): VFC<Props> {
    const component = memo((props: Props) => <View {...useHooks(props, this.settings)}/>);
    component.displayName = 'FooterComponent';

    return component;
  }
}
