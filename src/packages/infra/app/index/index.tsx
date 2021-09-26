import type { IAnalytics } from '$/domain/analytics';
import type { IAppService } from '$/domain/app';
import type { ITheme } from '$/domain/app/theme';
import type { AppProps } from 'next/app';
import type { PropsWithChildren } from 'react';
import { singleton, inject } from 'tsyringe';
import { useHooks } from '$/infra/app/index/hooks';

@singleton()
export class AppService implements IAppService {
  public constructor(
    @inject('ITheme') private theme: ITheme,
    @inject('IAnalytics') private analytics: IAnalytics,
  ) {
  }

  public create(): (props: PropsWithChildren<AppProps>) => JSX.Element {
    // eslint-disable-next-line react/display-name
    return ({ Component, pageProps }: PropsWithChildren<AppProps>) => {
      useHooks(this.analytics);
      return this.theme.render(
        {}, <>
          {this.analytics.render({})}
          <Component {...pageProps} />
        </>,
      );
    };
  }
}
