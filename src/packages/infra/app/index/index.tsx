import type { IAdvertising } from '$/domain/advertising';
import type { IAnalytics } from '$/domain/analytics';
import type { IAppService, AppPropsWithOptions } from '$/domain/app';
import type { ITheme } from '$/domain/app/theme';
import { singleton, inject } from 'tsyringe';
import { useHooks } from '$/infra/app/index/hooks';

@singleton()
export class AppService implements IAppService {
  public constructor(
    @inject('ITheme') private theme: ITheme,
    @inject('IAnalytics') private analytics: IAnalytics,
    @inject('IAdvertising') private advertising: IAdvertising,
  ) {
  }

  public create(): (props: AppPropsWithOptions) => JSX.Element {
    // eslint-disable-next-line react/display-name
    return ({ Component, pageProps }: AppPropsWithOptions) => {
      useHooks(Component.noTemplate ? undefined : this.analytics);

      return Component.noTemplate ? <Component {...pageProps} /> : this.theme.render(
        {}, <>
          {this.analytics.render({})}
          {this.advertising.render({})}
          <Component {...pageProps} />
        </>,
      );
    };
  }
}
