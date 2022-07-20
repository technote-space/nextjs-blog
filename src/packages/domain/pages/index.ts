import type { PostDTO } from '$/domain/post/dto/post';
import type { TagDTO } from '$/domain/post/dto/tag';
import type { PaginatedResponse } from '$/domain/post/service/pagination';
import type { IPage, ServerProps } from '$/domain/shared/page';
import type { GetStaticPropsResult } from 'next';

export type Props = ServerProps & PaginatedResponse<PostDTO> & {
  tag?: TagDTO;
};
export type IIndexPage = IPage<Props>;

export interface IIndexPageProps {
  getStaticProps(postType: string | undefined): Promise<GetStaticPropsResult<Props>>;
}
