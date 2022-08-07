import type { IComponent } from '@/domain/shared/component';
import type { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export abstract class BaseComponent<P = {}> implements IComponent<P> {
  private readonly __component: FC<P>;

  protected constructor() {
    this.__component = this.getComponent();
  }

  protected abstract getComponent(): FC<P>;

  public render(props?: P, children?: ReactNode): ReactElement {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Component = this.__component as FC<PropsWithChildren<any>>;
    return <Component {...props}>
      {children}
    </Component>;
  }
}
