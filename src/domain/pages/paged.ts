import type { Props as PagesProps } from '@/domain/pages';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';

export type Params = {
  page: string;
}
export type Props = PagesProps;

export interface IPagedPageProps {
  getStaticPaths(postType: string | undefined): Promise<GetStaticPathsResult<Params>>;

  getStaticProps(postType: string | undefined, params?: Params): Promise<GetStaticPropsResult<Props>>;
}
