import type { Props as PagesProps } from '$/domain/pages';
import type { IPage } from '$/domain/shared/page';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';

export type Params = {
  tag: string;
}
export type Props = PagesProps;

export type ITagPage = IPage<Props>;

export interface ITagPageProps {
  getStaticPaths(postType: string | undefined): Promise<GetStaticPathsResult<Params>>;

  getStaticProps(postType: string | undefined, params?: Params): Promise<GetStaticPropsResult<Props>>;
}
