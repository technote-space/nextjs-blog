import type { IHeadComponent, Props } from '$/domain/app/head';
import type { Settings } from '$/domain/app/settings';
import type { VFC } from 'react';
import { memo } from 'react';
import { inject, singleton } from 'tsyringe';
import { useHooks } from '$/infra/app/head/hooks';
import View from '$/infra/app/head/view';
import { BaseComponent } from '$/infra/shared/component';

@singleton()
export class HeadComponent extends BaseComponent<Props> implements IHeadComponent {
  public constructor(
    @inject('Settings') private settings: Settings,
  ) {
    super();
  }

  protected getComponent(): VFC<Props> {
    const component = memo((props: Props) => <View {...useHooks(props, this.settings)} />);
    component.displayName = 'Head';

    return component;
  }
}
