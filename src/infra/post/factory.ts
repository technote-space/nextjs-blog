import type { UrlMap } from '@/domain/app/settings';
import type { Settings } from '@/domain/app/settings';
import type { PostDetail } from '@/domain/post/entity/postDetail';
import type { Tag } from '@/domain/post/entity/tag';
import type { IPostFactory } from '@/domain/post/factory';
import type { IPostRepository } from '@/domain/post/repository/post';
import type { SearchParams } from '@/domain/post/repository/post';
import type { PaginationParams, PaginatedResponse } from '@/domain/post/service/pagination';
import type Id from '@/domain/post/valueObject/id';
import type { ICache } from '@/domain/shared/library/cache';
import { singleton, inject, container } from 'tsyringe';
import { Post } from '@/domain/post/entity/post';
import Source from '@/domain/post/valueObject/source';
import NotFoundException from '@/domain/shared/exceptions/notFound';

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

  public async all(postType: string | undefined, searchParams?: SearchParams, sortByUpdatedAt?: boolean): Promise<Post[]> {
    const result = await this.paginated({ page: 0 }, postType, searchParams);
    const posts = result.items;

    let page = 1;
    while (page < result.totalPage) {
      const result = await this.paginated({ page: page++ }, postType, searchParams);
      posts.push(...result.items);
    }

    if (sortByUpdatedAt) {
      return posts.sort((a, b) => a.compareUpdatedAt(b));
    }

    return posts;
  }

  public async count(postType: string | undefined, searchParams?: SearchParams): Promise<number> {
    const key = `PostFactory::count::${Post.ensurePostType(postType, this.settings)}::${searchParams?.tag}`;
    return this.cache.getOrGenerate(key, async () => {
      return this.__sources.reduce(async (prev, source) => {
        const acc = await prev;
        return acc + await this.__postRepositories[source.value].count(postType, searchParams);
      }, Promise.resolve(0));
    }, 60 * 10);
  }

  public async paginated(paginationParams: PaginationParams, postType: string | undefined, searchParams?: SearchParams): Promise<PaginatedResponse<Post>> {
    const key = `PostFactory::paginated::${paginationParams.page}::${Post.ensurePostType(postType, this.settings)}::${searchParams?.tag}`;
    return this.cache.getOrGenerate(key, async () => {
      const totalCount = await this.count(postType, searchParams);
      const totalPage = Math.ceil(totalCount / this.settings.perPage);
      const page = Math.min(totalPage - 1, paginationParams.page);
      let skip = this.settings.perPage * page;
      let take = this.settings.perPage;

      return {
        totalPage,
        page,
        items: await this.__sources.reduce(async (prev, source) => {
          const acc = await prev;
          if (take <= 0) return acc;

          const count = await this.__postRepositories[source.value].count(postType, searchParams);
          if (skip >= count) {
            skip -= count;
            return acc;
          }

          const posts = await this.__postRepositories[source.value].paginated({ skip, take }, postType, searchParams);
          skip = 0;
          take -= posts.length;

          return acc.concat(posts);
        }, Promise.resolve([] as Post[])),
      };
    }, 60 * 10);
  }

  public async fetch(id: Id, postType: string | undefined): Promise<PostDetail> {
    if (!(id.source.value in this.__postRepositories)) {
      throw new NotFoundException;
    }

    return this.__postRepositories[id.source.value].fetch(id, postType);
  }

  public async tags(postType: string | undefined): Promise<Tag[]> {
    return this.__sources.reduce(async (prev, source) => {
      const acc = await prev;
      return acc.concat(...await this.__postRepositories[source.value].tags(postType));
    }, Promise.resolve([] as Tag[]));
  }

  public async getUrlMaps(): Promise<UrlMap[]> {
    return this.__sources.reduce(async (prev, source) => {
      const acc = await prev;
      return acc.concat(...await this.__postRepositories[source.value].getUrlMaps());
    }, Promise.resolve([] as UrlMap[]));
  }
}
