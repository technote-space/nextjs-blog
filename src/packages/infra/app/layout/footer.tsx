import type { IFooterComponent } from '$/domain/app/layout/footer';
import type { VFC } from 'react';
import { memo } from 'react';
import { singleton } from 'tsyringe';
import { BaseComponent } from '$/infra/shared/component';

@singleton()
export class FooterComponent extends BaseComponent implements IFooterComponent {
  public constructor() {
    super();
  }

  protected getComponent(): VFC {
    const component = memo(() => {
      return <footer>
        <div>
          {(new Date()).getFullYear()} — <strong>Tech blog</strong>
        </div>
      </footer>;
    });
    component.displayName = 'FooterComponent';

    return component;
  }
}
