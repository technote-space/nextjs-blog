import type { ReactElement, ReactNode } from 'react';

export interface IComponent<P = {}> {
  render(props: P, children?: ReactNode): ReactElement;
}
