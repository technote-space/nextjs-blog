import type { IHeaderComponent } from '$/domain/app/layout/header';
import type { VFC } from 'react';
import { memo } from 'react';
import { singleton } from 'tsyringe';
import { BaseComponent } from '$/infra/shared/component';

@singleton()
export class HeaderComponent extends BaseComponent implements IHeaderComponent {
  public constructor() {
    super();
  }

  protected getComponent(): VFC {
    const component = memo(() => {
      return <header>
        Tech blog
      </header>;
    });
    component.displayName = 'HeaderComponent';

    return component;
  }
}
