import type { IAppService } from '$/domain/app';
import type { ITheme } from '$/domain/app/theme';
import type { AppProps } from 'next/app';
import type { PropsWithChildren } from 'react';
import { singleton, inject } from 'tsyringe';

@singleton()
export class AppService implements IAppService {
  public constructor(
    @inject('ITheme') private theme: ITheme,
  ) {
  }

  public create(): (props: PropsWithChildren<AppProps>) => JSX.Element {
    // eslint-disable-next-line react/display-name
    return ({ Component, pageProps }: PropsWithChildren<AppProps>): JSX.Element => {
      return this.theme.render({}, <Component {...pageProps} />);
    };
  }
}
