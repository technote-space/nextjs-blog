import type { IPage } from '$/domain/shared/page';
import type { PostDetailDTO } from '$/infra/post/dto/postDetail';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';

export type Props = {
  post: PostDetailDTO;
};
export type Params = {
  id: string;
};
export type IPostPage = IPage<Props>

export interface IPostPageProps {
  getStaticPaths(): Promise<GetStaticPathsResult<Params>>;

  getStaticProps(params?: Params): Promise<GetStaticPropsResult<Props>>;
}
