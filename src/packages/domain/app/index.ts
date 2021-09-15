import type { AppProps } from 'next/app';
import type { PropsWithChildren } from 'react';

export interface IAppService {
  create(): (props: PropsWithChildren<AppProps>) => JSX.Element;
}
