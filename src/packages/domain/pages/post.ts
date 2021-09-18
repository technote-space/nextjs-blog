import type { PostDetailDTO } from '$/domain/post/dto/postDetail';
import type { IPage, Paths as SharedPaths } from '$/domain/shared/page';

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
