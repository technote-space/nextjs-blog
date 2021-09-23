import type { PostDetailDTO } from '$/infra/post/dto/postDetail';
import type { GetStaticPathsResult } from 'next';

export type Props = {
  post: PostDetailDTO;
};
export type Params = {
  any: string[];
};
export type Paths = GetStaticPathsResult<Params>;

export interface IAnyPageProps {
  getStaticPaths(): Promise<Paths>;

  getStaticProps(params?: Params): Promise<Props>;
}
