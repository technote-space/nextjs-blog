import type { IComponent } from '@/domain/shared/component';

export interface IAnalytics extends IComponent {
  isValid(): boolean;

  pageView(path: string): void;

  event(action: string, category?: string, label?: string, value?: number): void;
}
