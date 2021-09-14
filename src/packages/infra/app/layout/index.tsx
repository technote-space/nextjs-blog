import type { ILayoutComponent, Props } from '$/domain/app/layout';
import type { IFooterComponent } from '$/domain/app/layout/footer';
import type { IHeaderComponent } from '$/domain/app/layout/header';
import { memo } from 'react';
import { BaseComponent } from '$/infra/shared/component';
import { singleton, inject } from 'tsyringe';
import Link from 'next/link';
import { pagesPath } from '@/lib/$path';

@singleton()
export class LayoutComponent extends BaseComponent<Props> implements ILayoutComponent {
  public constructor(
    @inject('IHeaderComponent') private headerComponent: IHeaderComponent,
    @inject('IFooterComponent') private footerComponent: IFooterComponent,
  ) {
    super();
  }

  protected getComponent() {
    const component = memo(({ children, isHome }: Props) => {
      return <div>
        {this.headerComponent.render({})}
        <main>
          <div>
            {children}
          </div>
          {!isHome && <div>
            <Link href={pagesPath.$url()}>
              <a>← Back to home</a>
            </Link>
          </div>}
        </main>
        {this.footerComponent.render({})}
      </div>;
    });
    component.displayName = 'LayoutComponent';

    return component;
  }
}
