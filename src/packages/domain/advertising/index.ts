import type { IComponent } from '$/domain/shared/component';

export interface IAdvertising extends IComponent {
  isValid(): boolean;
}
