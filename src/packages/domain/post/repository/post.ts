import type { Post } from '$/domain/post/entity/post';
import type Id from '$/domain/post/valueObject/id';

export interface IPostRepository {
  all(): Promise<Post[]>;

  getIds(): Promise<Id[]>;

  fetch(id: Id): Promise<Post> | never;
}
