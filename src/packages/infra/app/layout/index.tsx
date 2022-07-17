import type { IHeadComponent } from '$/domain/app/head';
import type { ILayoutComponent, Props } from '$/domain/app/layout';
import type { IFooterComponent } from '$/domain/app/layout/footer';
import type { IHeaderComponent } from '$/domain/app/layout/header';
import type { FC, PropsWithChildren } from 'react';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import View from '$/infra/app/layout/view';
import { BaseComponent } from '$/infra/shared/component';

@singleton()
export class LayoutComponent extends BaseComponent<Props> implements ILayoutComponent {
  public constructor(
    @inject('IHeadComponent') private headComponent: IHeadComponent,
    @inject('IHeaderComponent') private headerComponent: IHeaderComponent,
    @inject('IFooterComponent') private footerComponent: IFooterComponent,
  ) {
    super();
  }

  protected getComponent(): FC<PropsWithChildren<Props>> {
    const component = memo<PropsWithChildren<Props>>(({ headerPages, footerPages, seo, children }: Props) => <View
      head={this.headComponent.render(seo ?? {})}
      header={this.headerComponent.render({ headerPages })}
      footer={this.footerComponent.render({ footerPages })}
    >
      {children}
    </View>);
    component.displayName = 'LayoutComponent';

    return component;
  }
}
