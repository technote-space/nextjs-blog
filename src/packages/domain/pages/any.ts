import type { Paths as SharedPaths } from '$/domain/shared/page';
import type { PostDetailDTO } from '$/infra/post/dto/postDetail';

export type Props = {
  post: PostDetailDTO;
};
export type Params = {
  any: string[];
};
export type Paths = SharedPaths<Params>;

export interface IAnyPageProps {
  getStaticPaths(): Promise<Paths>;

  getStaticProps(params?: Params): Promise<Props>;
}
