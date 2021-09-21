import type { IHeaderComponent } from '$/domain/app/layout/header';
import type { VFC } from 'react';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import Header from '$/infra/app/layout/components/Header';
import { BaseComponent } from '$/infra/shared/component';
import type { Settings } from '$/domain/app/settings';

@singleton()
export class HeaderComponent extends BaseComponent implements IHeaderComponent {
  public constructor(
    @inject('Settings') private settings: Settings,
  ) {
    super();
  }

  protected getComponent(): VFC {
    const component = memo(() => <Header title={this.settings.blogTitle}/>);
    component.displayName = 'HeaderComponent';

    return component;
  }
}
