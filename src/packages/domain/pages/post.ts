import type { IPage } from '$/domain/shared/page';
import type { PostDetailDTO } from '$/infra/post/dto/postDetail';
import type { GetStaticPathsResult } from 'next';

export type Props = {
  post: PostDetailDTO;
};
export type Params = {
  id: string;
};
export type Paths = GetStaticPathsResult<Params>;

export type IPostPage = IPage<Props>

export interface IPostPageProps {
  getStaticPaths(): Promise<Paths>;

  getStaticProps(params?: Params): Promise<Props>;
}
