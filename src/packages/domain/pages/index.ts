import type { PostDTO } from '$/domain/post/dto/post';
import type { IPage } from '$/domain/shared/page';

export type Props = {
  posts: PostDTO[];
};

export type IIndexPage = IPage<Props>

export interface IIndexPageProps {
  getStaticProps(): Promise<Props>;
}
