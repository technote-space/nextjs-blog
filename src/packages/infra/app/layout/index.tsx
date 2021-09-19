import type { ILayoutComponent, Props } from '$/domain/app/layout';
import type { IFooterComponent } from '$/domain/app/layout/footer';
import type { IHeaderComponent } from '$/domain/app/layout/header';
import type { VFC } from 'react';
import Link from 'next/link';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import { BaseComponent } from '$/infra/shared/component';
import Box from '@/components/layout/Box';
import { pagesPath } from '@/lib/$path';

@singleton()
export class LayoutComponent extends BaseComponent<Props> implements ILayoutComponent {
  public constructor(
    @inject('IHeaderComponent') private headerComponent: IHeaderComponent,
    @inject('IFooterComponent') private footerComponent: IFooterComponent,
  ) {
    super();
  }

  protected getComponent(): VFC<Props> {
    const component = memo(({ children, isHome }: Props) => {
      return <Box mx="auto" maxW={1000}>
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
      </Box>;
    });
    component.displayName = 'LayoutComponent';

    return component;
  }
}
