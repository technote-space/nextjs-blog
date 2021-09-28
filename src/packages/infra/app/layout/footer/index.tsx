import type { IFooterComponent } from '$/domain/app/layout/footer';
import type { Settings } from '$/domain/app/settings';
import type { VFC } from 'react';
import { memo } from 'react';
import { inject, singleton } from 'tsyringe';
import { useHooks } from '$/infra/app/layout/footer/hooks';
import View from '$/infra/app/layout/footer/view';
import { BaseComponent } from '$/infra/shared/component';

@singleton()
export class FooterComponent extends BaseComponent implements IFooterComponent {
  public constructor(
    @inject('Settings') private settings: Settings,
  ) {
    super();
  }

  protected getComponent(): VFC {
    const component = memo(() => <View {...useHooks(this.settings)}/>);
    component.displayName = 'FooterComponent';

    return component;
  }
}
