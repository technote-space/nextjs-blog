import type { UrlMap } from '@/domain/app/settings';
import type { Post } from '@/domain/post/entity/post';
import type { PostDetail } from '@/domain/post/entity/postDetail';
import type { Tag } from '@/domain/post/entity/tag';
import type { SearchParams } from '@/domain/post/repository/post';
import type { PaginationParams, PaginatedResponse } from '@/domain/post/service/pagination';
import type Id from '@/domain/post/valueObject/id';

export interface IPostFactory {
  all(postType: string | undefined, searchParams?: SearchParams, sortByUpdatedAt?: boolean): Promise<Post[]>;

  count(postType: string | undefined, searchParams?: SearchParams): Promise<number>;

  paginated(paginationParams: PaginationParams, postType: string | undefined, searchParams?: SearchParams): Promise<PaginatedResponse<Post>>;

  fetch(id: Id, postType: string | undefined): Promise<PostDetail> | never;

  tags(postType: string | undefined): Promise<Tag[]>;

  getUrlMaps(): Promise<UrlMap[]>;
}
