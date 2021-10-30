import type { UrlMap } from '$/domain/app/settings';
import type { Post } from '$/domain/post/entity/post';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type { IPostFactory } from '$/domain/post/factory';
import type { IPostRepository } from '$/domain/post/repository/post';
import type Id from '$/domain/post/valueObject/id';
import { singleton, inject, container } from 'tsyringe';
import Source from '$/domain/post/valueObject/source';
import NotFoundException from '$/domain/shared/exceptions/notFound';

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

  public async all(postType?: string, sortByUpdatedAt?: boolean): Promise<Post[]> {
    return (await this.getSources().reduce(async (prev, source) => {
      const acc = await prev;
      return acc.concat(...await this.__postRepositories[source.value].all(postType));
    }, Promise.resolve([] as Post[]))).sort((a, b) => sortByUpdatedAt ? a.compareUpdatedAt(b) : a.compare(b));
  }

  public async getIds(postType?: string): Promise<Id[]> {
    return this.getSources().reduce(async (prev, source) => {
      const acc = await prev;
      return acc.concat(...await this.__postRepositories[source.value].getIds(postType));
    }, Promise.resolve([] as Id[]));
  }

  public async fetch(id: Id, postType?: string): Promise<PostDetail> {
    if (!(id.source.value in this.__postRepositories)) {
      throw new NotFoundException;
    }

    return this.__postRepositories[id.source.value].fetch(id, postType);
  }

  public async getUrlMaps(): Promise<UrlMap[]> {
    return this.getSources().reduce(async (prev, source) => {
      const acc = await prev;
      return acc.concat(...await this.__postRepositories[source.value].getUrlMaps());
    }, Promise.resolve([] as UrlMap[]));
  }
}
