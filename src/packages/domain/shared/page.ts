import type { VFC } from 'react';

export interface IPage<P = {}> {
  create(): VFC<P>;
}
