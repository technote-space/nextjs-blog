import type { UrlMap } from '$/domain/app/settings';
import type { Settings } from '$/domain/app/settings';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type { Tag } from '$/domain/post/entity/tag';
import type { IPostFactory } from '$/domain/post/factory';
import type { IPostRepository } from '$/domain/post/repository/post';
import type { SearchParams } from '$/domain/post/repository/post';
import type Id from '$/domain/post/valueObject/id';
import type { ICache } from '$/domain/shared/library/cache';
import { singleton, inject, container } from 'tsyringe';
import { Post } from '$/domain/post/entity/post';
import Source from '$/domain/post/valueObject/source';
import NotFoundException from '$/domain/shared/exceptions/notFound';

@singleton()
export class PostFactory implements IPostFactory {
  private readonly __sources: Source[];
  private readonly __postRepositories: { [source: string]: IPostRepository };

  public constructor(
    @inject('postRepositories') postRepositories: { [source: string]: { source: string; sourceId: string; repository: string } },
    @inject('Settings') private settings: Settings,
    @inject('ICache') private cache: ICache,
  ) {
    this.__postRepositories = Object.assign({}, ...Object.keys(postRepositories).map(source => {
      const repository = container.resolve<IPostRepository>(postRepositories[source].repository);
      repository.setSourceId(postRepositories[source].sourceId);
      return { [source]: repository };
    }));

    const sources = Object.values(postRepositories);
    this.__sources = settings.targetSources.map(v => sources.find(source => source.source === v)).filter((v): v is { source: string; sourceId: string; repository: string } => !!v).map(v => Source.create(v.sourceId));
  }

  public async all(postType?: string, params?: SearchParams, sortByUpdatedAt?: boolean): Promise<Post[]> {
    const key = `PostFactory::all::${Post.ensurePostType(postType, this.settings)}::${params?.tag}::${sortByUpdatedAt ? 1 : 0}`;
    return this.cache.getOrGenerate(key, async () => (await this.__sources.reduce(async (prev, source) => {
      const acc = await prev;
      return acc.concat(...await this.__postRepositories[source.value].all(postType, params));
    }, Promise.resolve([] as Post[]))).sort((a, b) => sortByUpdatedAt ? a.compareUpdatedAt(b) : a.compare(b)), 60 * 10);
  }

  public async getIds(postType?: string, params?: SearchParams): Promise<Id[]> {
    return (await this.all(postType, params)).map(post => post.getId());
  }

  public async fetch(id: Id, postType?: string): Promise<PostDetail> {
    if (!(id.source.value in this.__postRepositories)) {
      throw new NotFoundException;
    }

    return this.__postRepositories[id.source.value].fetch(id, postType);
  }

  public async tags(): Promise<Tag[]> {
    return this.__sources.reduce(async (prev, source) => {
      const acc = await prev;
      return acc.concat(...await this.__postRepositories[source.value].tags());
    }, Promise.resolve([] as Tag[]));
  }

  public async getUrlMaps(): Promise<UrlMap[]> {
    return this.__sources.reduce(async (prev, source) => {
      const acc = await prev;
      return acc.concat(...await this.__postRepositories[source.value].getUrlMaps());
    }, Promise.resolve([] as UrlMap[]));
  }
}
