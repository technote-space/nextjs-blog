import type { VFC, PropsWithChildren, ReactElement, ReactNode } from 'react';
import type { IComponent } from '$/domain/shared/component';

export abstract class BaseComponent<P = {}> implements IComponent<P> {
  private readonly __component: VFC<P>;

  protected constructor() {
    this.__component = this.getComponent();
  }

  protected abstract getComponent(): VFC<P>;

  public render(props?: P, children?: ReactNode): ReactElement {
    const Component = this.__component as VFC<PropsWithChildren<any>>;
    return <Component {...props}>
      {children}
    </Component>;
  }
}
