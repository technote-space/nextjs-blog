import type { AppProps } from 'next/app';

export type AppPropsWithOptions = Omit<AppProps, 'Component'> & {
  Component: AppProps['Component'] & {
    noTemplate?: boolean;
  };
};

export interface IAppService {
  create(): (props: AppPropsWithOptions) => JSX.Element;
}
