import type { UrlMap } from '$/domain/app/settings';
import type { Post } from '$/domain/post/entity/post';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type { Tag } from '$/domain/post/entity/tag';
import type { SearchParams } from '$/domain/post/repository/post';
import type Id from '$/domain/post/valueObject/id';

export interface IPostFactory {
  all(postType?: string, params?: SearchParams, sortByUpdatedAt?: boolean): Promise<Post[]>;

  getIds(postType?: string, params?: SearchParams): Promise<Id[]>;

  fetch(id: Id, postType?: string): Promise<PostDetail> | never;

  tags(): Promise<Tag[]>;

  getUrlMaps(): Promise<UrlMap[]>;
}
