import type { Post } from '$/domain/post/entity/post';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type Id from '$/domain/post/valueObject/id';

export interface IPostRepository {
  setSourceId(sourceId: string): void;

  all(postType?: string): Promise<Post[]>;

  getIds(postType?: string): Promise<Id[]>;

  fetch(id: Id, postType?: string): Promise<PostDetail> | never;
}
