import type { Post } from '$/domain/post/entity/post';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type Id from '$/domain/post/valueObject/id';
import Source from '$/domain/post/valueObject/source';

export interface IPostFactory {
  getSources(): Source[];

  all(postType?: string, sortByUpdatedAt?: boolean): Promise<Post[]>;

  getIds(postType?: string): Promise<Id[]>;

  fetch(id: Id, postType?: string): Promise<PostDetail> | never;
}
