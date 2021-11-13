import type { UrlMap } from '$/domain/app/settings';
import type { Post } from '$/domain/post/entity/post';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type { Tag } from '$/domain/post/entity/tag';
import type Id from '$/domain/post/valueObject/id';

export type SearchParams = {
  tag?: string;
}

export interface IPostRepository {
  setSourceId(sourceId: string): void;

  all(postType?: string, params?: SearchParams): Promise<Post[]>;

  fetch(id: Id, postType?: string): Promise<PostDetail> | never;

  tags(): Promise<Tag[]>;

  getUrlMaps(): Promise<UrlMap[]>;
}
