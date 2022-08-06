import type { PostDetailDTO } from '@/domain/post/dto/postDetail';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';

export type Props = {
  post: PostDetailDTO;
};
export type Params = {
  any: string[];
};

export interface IAnyPageProps {
  getStaticPaths(): Promise<GetStaticPathsResult<Params>>;

  getStaticProps(params?: Params): Promise<GetStaticPropsResult<Props>>;
}
