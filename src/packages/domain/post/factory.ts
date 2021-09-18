import type { Post } from '$/domain/post/entity/post';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type Id from '$/domain/post/valueObject/id';
import Source from '$/domain/post/valueObject/source';

export interface IPostFactory {
  getSources(): Source[];

  all(source: Source): Promise<Post[]>;

  getIds(source: Source): Promise<Id[]>;

  fetch(id: Id): Promise<PostDetail> | never;
}
