import type { IHeaderComponent, Props } from '@/domain/app/layout/header';
import type { Settings } from '@/domain/app/settings';
import type { IDarkMode } from '@/domain/app/theme/darkMode';
import type { FC } from 'react';
import { memo } from 'react';
import { singleton, inject } from 'tsyringe';
import { useHooks } from '@/infra/app/layout/header/hooks';
import View from '@/infra/app/layout/header/view';
import { BaseComponent } from '@/infra/shared/component';

@singleton()
export class HeaderComponent extends BaseComponent<Props> implements IHeaderComponent {
  public constructor(
    @inject('Settings') private settings: Settings,
    @inject('IDarkMode') private darkMode: IDarkMode,
  ) {
    super();
  }

  protected getComponent(): FC<Props> {
    const component = memo((props: Props) => <View {...useHooks(props, this.settings, this.darkMode)}/>);
    component.displayName = 'HeaderComponent';

    return component;
  }
}
