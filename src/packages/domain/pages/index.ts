import type { PostDTO } from '$/domain/post/dto/post';
import type { IPage, ServerProps } from '$/domain/shared/page';
import type { GetStaticPropsResult } from 'next';

export type Props = ServerProps & {
  posts: PostDTO[];
};
export type IIndexPage = IPage<Props>

export interface IIndexPageProps {
  getStaticProps(postType?: string): Promise<GetStaticPropsResult<Props>>;
}
