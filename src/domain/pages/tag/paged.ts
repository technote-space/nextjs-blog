import type { Props as PagesProps } from '@/domain/pages';
import type { TagDTO } from '@/domain/post/dto/tag';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';

export type Params = {
  tag: string;
  page: string;
}
export type Props = PagesProps & {
  tag?: TagDTO;
};

export interface ITagPagedPageProps {
  getStaticPaths(postType: string | undefined): Promise<GetStaticPathsResult<Params>>;

  getStaticProps(postType: string | undefined, params?: Params): Promise<GetStaticPropsResult<Props>>;
}
