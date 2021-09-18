import type { IPage } from '$/domain/shared/page';
import type { PostDTO } from '$/infra/post/dto/post';

export type Props = {
  posts: PostDTO[];
};

export type IIndexPage = IPage<Props>

export interface IIndexPageProps {
  getStaticProps(): Promise<Props>;
}
