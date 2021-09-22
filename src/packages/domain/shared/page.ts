import type { VFC } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export interface IPage<P = {}> {
  create(): VFC<P>;
}

export type Paths<Params extends Record<string, string | number | (string | number)[]>> = {
  paths: { params: Params } [];
  fallback: boolean | 'blocking';
}
