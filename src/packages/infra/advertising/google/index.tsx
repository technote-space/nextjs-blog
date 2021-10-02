import type { IAdvertising } from '$/domain/advertising';
import type { Settings } from '$/domain/app/settings';
import type { VFC } from 'react';
import { memo } from 'react';
import { inject, singleton } from 'tsyringe';
import View from '$/infra/advertising/google/view';
import { BaseComponent } from '$/infra/shared/component';

@singleton()
export class GoogleAdsense extends BaseComponent implements IAdvertising {
  private readonly __isValid: boolean;
  private readonly __googleAdsenseClientId: string;

  public constructor(@inject('Settings') settings: Settings) {
    super();

    this.__isValid = !!settings.advertising?.googleAdsenseClientId;
    this.__googleAdsenseClientId = settings.advertising?.googleAdsenseClientId ?? '';
  }

  protected getComponent(): VFC {
    const component = memo(() => <View googleAdsenseClientId={this.__googleAdsenseClientId}/>);
    component.displayName = 'GoogleAdsense';

    return component;
  }

  public isValid(): boolean {
    return this.__isValid;
  }
}
