import type { VFC } from 'react';

export interface IPage<P = {}> {
  create(): VFC<P>;
}

export type Paths<Params extends Record<string, string | number>> = {
  paths: { params: Params } [];
  fallback: boolean | 'blocking';
}
