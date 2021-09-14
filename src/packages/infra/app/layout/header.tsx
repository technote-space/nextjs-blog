import type { IHeaderComponent } from '$/domain/app/layout/header';
import { memo } from 'react';
import { BaseComponent } from '$/infra/shared/component';
import { singleton } from 'tsyringe';

@singleton()
export class HeaderComponent extends BaseComponent implements IHeaderComponent {
  public constructor() {
    super();
  }

  protected getComponent() {
    const component = memo(() => {
      return <header>
        Tech blog
      </header>;
    });
    component.displayName = 'HeaderComponent';

    return component;
  }
}
