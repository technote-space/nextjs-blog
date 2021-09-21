import type { IComponent } from '$/domain/shared/component';
import type { PropsWithChildren } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = PropsWithChildren<{}>;

export type ILayoutComponent = IComponent<Props>
