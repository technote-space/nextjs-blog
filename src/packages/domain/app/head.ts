import type { IComponent } from '$/domain/shared/component';

export type Props = {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
}

export type IHeadComponent = IComponent<Props>;
