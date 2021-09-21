import type { ILayoutComponent, Props } from '$/domain/app/layout';
import type { IFooterComponent } from '$/domain/app/layout/footer';
import type { IHeaderComponent } from '$/domain/app/layout/header';
import type { VFC } from 'react';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import { BaseComponent } from '$/infra/shared/component';
import Box from '@/components/layout/Box';

@singleton()
export class LayoutComponent extends BaseComponent<Props> implements ILayoutComponent {
  public constructor(
    @inject('IHeaderComponent') private headerComponent: IHeaderComponent,
    @inject('IFooterComponent') private footerComponent: IFooterComponent,
  ) {
    super();
  }

  protected getComponent(): VFC<Props> {
    const component = memo(({ children }: Props) => {
      return <Box>
        {this.headerComponent.render({})}
        <main>
          <Box mx="auto" maxW={1000}>
            {children}
          </Box>
        </main>
        {this.footerComponent.render({})}
      </Box>;
    });
    component.displayName = 'LayoutComponent';

    return component;
  }
}
