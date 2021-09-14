import type { PropsWithChildren } from 'react';
import type { AppProps } from 'next/app';

export interface IAppService {
  create(): (props: PropsWithChildren<AppProps>) => JSX.Element;
}
