import type { IComponent } from '$/domain/shared/component';
import type { PropsWithChildren } from 'react';

export type Props = PropsWithChildren<{}>;

export type ILayoutComponent = IComponent<Props>
