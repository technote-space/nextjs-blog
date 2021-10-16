import type { ICardPage, Props } from '$/domain/pages/card';
import type { VFC } from 'react';
import { memo } from 'react';
import { singleton } from 'tsyringe';
import { useHooks } from '$/infra/pages/card/hooks';
import View from '$/infra/pages/card/view';

@singleton()
export class CardPage implements ICardPage {
  public create(): VFC<Props> {
    const component = memo((props: Props) => <View {...useHooks(props)} />);
    component.displayName = 'CardPage';

    return component;
  }
}
