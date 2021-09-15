import type { Post } from '$/domain/post/entity/post';
import type { IPostFactory } from '$/domain/post/factory';
import type { IPostRepository } from '$/domain/post/repository/post';
import type Id from '$/domain/post/valueObject/id';
import Source from '$/domain/post/valueObject/source';
import { singleton, inject } from 'tsyringe';

@singleton()
export class PostFactory implements IPostFactory {
  private readonly __sources: Source[];

  public constructor(@inject('postRepositories') private postRepositories: { [source: string]: IPostRepository }) {
    this.__sources = Object.keys(this.postRepositories).map(source => Source.create(source));
  }

  public getSources(): Source[] {
    return this.__sources;
  }

  public all(source: Source): Promise<Post[]> {
    return this.postRepositories[source.value].all();
  }

  public getIds(source: Source): Promise<Id[]> {
    return this.postRepositories[source.value].getIds();
  }

  public fetch(id: Id): Promise<Post> {
    return this.postRepositories[id.source.value].fetch(id);
  }
}
