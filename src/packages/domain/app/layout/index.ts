import type { PropsWithChildren } from 'react';
import type { IComponent } from '$/domain/shared/component';

export type Props = PropsWithChildren<{
  isHome?: boolean;
}>;

export interface ILayoutComponent extends IComponent<Props> {
}
