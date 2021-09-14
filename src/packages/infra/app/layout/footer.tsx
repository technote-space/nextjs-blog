import type { IFooterComponent } from '$/domain/app/layout/footer';
import { memo } from 'react';
import { BaseComponent } from '$/infra/shared/component';
import { singleton } from 'tsyringe';

@singleton()
export class FooterComponent extends BaseComponent implements IFooterComponent {
  public constructor() {
    super();
  }

  protected getComponent() {
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
