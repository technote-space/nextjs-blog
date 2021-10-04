import type { PostDetailDTO } from '$/domain/post/dto/postDetail';
import type { IPage, ServerProps } from '$/domain/shared/page';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';

export type Props = ServerProps & {
  post: PostDetailDTO;
};
export type Params = {
  id: string;
};
export type IPostPage = IPage<Props>

export interface IPostPageProps {
  getStaticPaths(postType?: string): Promise<GetStaticPathsResult<Params>>;

  getStaticProps(params?: Params, postType?: string): Promise<GetStaticPropsResult<Props>>;
}
