import type { IHeaderComponent } from '$/domain/app/layout/header';
import type { Settings } from '$/domain/app/settings';
import type { VFC } from 'react';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import { useHooks } from '$/infra/app/layout/header/hooks';
import View from '$/infra/app/layout/header/view';
import { BaseComponent } from '$/infra/shared/component';

@singleton()
export class HeaderComponent extends BaseComponent implements IHeaderComponent {
  public constructor(
    @inject('Settings') private settings: Settings,
  ) {
    super();
  }

  protected getComponent(): VFC {
    const component = memo(() => <View {...useHooks(this.settings)}/>);
    component.displayName = 'HeaderComponent';

    return component;
  }
}
