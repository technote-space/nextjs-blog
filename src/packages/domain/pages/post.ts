import type { IPage, Paths as SharedPaths } from '$/domain/shared/page';
import type { PostDetailDTO } from '$/infra/post/dto/postDetail';

export type Props = {
  post: PostDetailDTO;
};
export type Params = {
  id: string;
};
export type Paths = SharedPaths<Params>;

export type IPostPage = IPage<Props>

export interface IPostPageProps {
  getStaticPaths(): Promise<Paths>;

  getStaticProps(params?: Params): Promise<Props>;
}
