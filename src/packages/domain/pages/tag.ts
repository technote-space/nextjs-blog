import type { Props } from '$/domain/pages';
import type { IPage } from '$/domain/shared/page';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';

export type Params = {
  tag: string;
}

export type ITagPage = IPage<Props>;

export interface ITagPageProps {
  getStaticPaths(): Promise<GetStaticPathsResult<Params>>;

  getStaticProps(params?: Params): Promise<GetStaticPropsResult<Props>>;
}
