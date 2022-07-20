import type { UrlMap } from '$/domain/app/settings';
import type { Post } from '$/domain/post/entity/post';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type { Tag } from '$/domain/post/entity/tag';
import type { _PaginationParams } from '$/domain/post/service/pagination';
import type Id from '$/domain/post/valueObject/id';

export type SearchParams = {
  tag?: string;
}

export interface IPostRepository {
  setSourceId(sourceId: string): void;

  count(postType: string | undefined, searchParams?: SearchParams): Promise<number>;

  paginated(paginationParams: _PaginationParams, postType: string | undefined, searchParams?: SearchParams): Promise<Post[]>;

  fetch(id: Id, postType: string | undefined): Promise<PostDetail> | never;

  tags(postType: string | undefined): Promise<Tag[]>;

  getUrlMaps(): Promise<UrlMap[]>;
}
