import type { Props as HeadProps } from '$/domain/app/head';
import type { IComponent } from '$/domain/shared/component';
import type { ServerProps } from '$/domain/shared/page';
import type { PropsWithChildren } from 'react';

export type Props = PropsWithChildren<ServerProps & {
  seo?: HeadProps;
}>;

export type ILayoutComponent = IComponent<Props>;
