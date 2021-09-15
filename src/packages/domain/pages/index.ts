import type { IPage } from '$/domain/shared/page';
import type { PostDTO } from '$/domain/post/dto/post';

export type Props = {
  posts: PostDTO[];
};

export interface IIndexPage extends IPage<Props> {
}

export interface IIndexPageProps {
  getStaticProps(): Promise<Props>;
}
