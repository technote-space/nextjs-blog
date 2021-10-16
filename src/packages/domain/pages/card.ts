import type { IPage } from '$/domain/shared/page';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';

export type Props = {
  url: string;
  image: string | null;
  dominantColor: string | null;
  title: string | null;
  description: string | null;
  canonical: string | null;
  source: string | null;
};
export type Params = {
  url: string;
};

export type ICardPage = IPage<Props>;

export interface ICardPageProps {
  getStaticPaths(): Promise<GetStaticPathsResult<Params>>;

  getStaticProps(params?: Params): Promise<GetStaticPropsResult<Props>>;
}
