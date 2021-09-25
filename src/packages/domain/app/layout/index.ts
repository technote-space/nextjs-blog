import type { Props as HeadProps } from '$/domain/app/head';
import type { IComponent } from '$/domain/shared/component';
import type { PropsWithChildren } from 'react';

export type Props = PropsWithChildren<{
  seo?: HeadProps;
}>;

export type ILayoutComponent = IComponent<Props>;
