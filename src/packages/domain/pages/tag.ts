import type { PostDTO } from '$/domain/post/dto/post';
import type { IPage, ServerProps } from '$/domain/shared/page';
import type { GetStaticPathsResult, GetStaticPropsResult } from 'next';

export type Props = ServerProps & {
  posts: PostDTO[];
};
export type Params = {
  tag: string;
}

export type ITagPage = IPage<Props>;

export interface ITagPageProps {
  getStaticPaths(): Promise<GetStaticPathsResult<Params>>;

  getStaticProps(params?: Params): Promise<GetStaticPropsResult<Props>>;
}
