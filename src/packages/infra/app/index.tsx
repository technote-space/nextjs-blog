import type { PropsWithChildren } from 'react';
import type { AppProps } from 'next/app';
import type { IAppService } from '$/domain/app';
import type { ITheme } from '$/domain/app/theme';
import type { IHeadComponent } from '$/domain/app/head';
import { singleton, inject } from 'tsyringe';

@singleton()
export class AppService implements IAppService {
  public constructor(
    @inject('ITheme') private theme: ITheme,
    @inject('IHeadComponent') private headComponent: IHeadComponent,
  ) {
  }

  public create(): (props: PropsWithChildren<AppProps>) => JSX.Element {
    // eslint-disable-next-line react/display-name
    return ({ Component, pageProps }: PropsWithChildren<AppProps>): JSX.Element => {
      return this.theme.render({}, <>
        {this.headComponent.render({})}
        <Component {...pageProps} />
      </>);
    };
  }
}
