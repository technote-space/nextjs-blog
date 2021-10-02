import type { Post } from '$/domain/post/entity/post';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type { IPostFactory } from '$/domain/post/factory';
import type { IPostRepository } from '$/domain/post/repository/post';
import type Id from '$/domain/post/valueObject/id';
import { singleton, inject, container } from 'tsyringe';
import Source from '$/domain/post/valueObject/source';

@singleton()
export class PostFactory implements IPostFactory {
  private readonly __sources: Source[];
  private readonly __postRepositories: { [source: string]: IPostRepository };

  public constructor(@inject('postRepositories') postRepositories: { [source: string]: { sourceId: string; repository: string } }) {
    this.__postRepositories = Object.assign({}, ...Object.keys(postRepositories).map(source => {
      const repository = container.resolve<IPostRepository>(postRepositories[source].repository);
      repository.setSourceId(postRepositories[source].sourceId);
      return { [source]: repository };
    }));
    this.__sources = Object.keys(postRepositories).map(source => Source.create(source));
  }

  public getSources(): Source[] {
    return this.__sources;
  }

  public all(source: Source, postType?: string): Promise<Post[]> {
    return this.__postRepositories[source.value].all(postType);
  }

  public getIds(source: Source, postType?: string): Promise<Id[]> {
    return this.__postRepositories[source.value].getIds(postType);
  }

  public fetch(id: Id, postType?: string): Promise<PostDetail> {
    return this.__postRepositories[id.source.value].fetch(id, postType);
  }
}
