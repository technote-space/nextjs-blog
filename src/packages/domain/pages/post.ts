import type { PostDTO } from '$/domain/post/dto/post';
import type { PostDetailDTO } from '$/domain/post/dto/postDetail';
import type { IPage, ServerProps } from '$/domain/shared/page';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';

export type Props = ServerProps & {
  post: PostDetailDTO;
  prev: PostDTO | null;
  next: PostDTO | null;
};
export type Params = {
  id: string;
};

export type IPostPage = IPage<Props>;

export interface IPostPageProps {
  getStaticPaths(postType: string | undefined): Promise<GetStaticPathsResult<Params>>;

  getStaticProps(postType: string | undefined, params?: Params): Promise<GetStaticPropsResult<Props>>;
}
