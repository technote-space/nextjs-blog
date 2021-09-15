import type { Post } from '$/domain/post/entity/post';
import type Id from '$/domain/post/valueObject/id';

export interface IPostManager {
  all(): Promise<Post[]>;

  getIds(): Promise<Id[]>;

  fetch(id: Id): Promise<Post> | never;
}
