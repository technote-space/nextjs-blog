import type { FC } from 'react';

type Page = { label: string; url: string };
export type ServerProps = {
  headerPages: Page[];
  footerPages: Page[];
};

// eslint-disable-next-line @typescript-eslint/ban-types
export interface IPage<P = {}> {
  create(): FC<P>;
}
