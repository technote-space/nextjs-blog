import type { IAnalytics } from '@/domain/analytics';
import type { Settings } from '@/domain/app/settings';
import type { FC } from 'react';
import { memo } from 'react';
import { inject, singleton } from 'tsyringe';
import View from '@/infra/analytics/google/view';
import { BaseComponent } from '@/infra/shared/component';

@singleton()
export class GoogleAnalytics extends BaseComponent implements IAnalytics {
  private readonly __isValid: boolean;
  private readonly __gaMeasurementId: string;

  public constructor(@inject('Settings') settings: Settings) {
    super();

    this.__isValid = !!settings.analytics?.googleAnalyticsId;
    this.__gaMeasurementId = settings.analytics?.googleAnalyticsId ?? '';
  }

  protected getComponent(): FC {
    const component = memo(() => <View gaMeasurementId={this.__gaMeasurementId}/>);
    component.displayName = 'GoogleAnalytics';

    return component;
  }

  public isValid(): boolean {
    return this.__isValid;
  }

  public pageView(path: string): void {
    if (!this.isValid()) {
      return;
    }

    window.gtag('config', this.__gaMeasurementId, {
      page_path: path,
    });
  }

  public event(action: string, category?: string, label?: string, value?: number): void {
    if (!this.isValid()) {
      return;
    }

    window.gtag('event', action, {
      event_category: category,
      event_label: label ? JSON.stringify(label) : '',
      value,
    });
  }
}
