import type { IPage, Paths as SharedPaths } from '$/domain/shared/page';
import type { PostDTO } from '$/domain/post/dto/post';

export type Props = {
  post: PostDTO;
};
export type Params = {
  id: string;
};
export type Paths = SharedPaths<Params>;

export interface IPostPage extends IPage<Props> {
}

export interface IPostPageProps {
  getStaticPaths(): Promise<Paths>;

  getStaticProps(params?: Params): Promise<Props>;
}
