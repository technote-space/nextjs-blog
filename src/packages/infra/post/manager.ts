import type { Post } from '$/domain/post/entity/post';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type { IPostFactory } from '$/domain/post/factory';
import type Id from '$/domain/post/valueObject/id';
import { singleton, inject } from 'tsyringe';
import { IPostManager } from '$/domain/post/manager';

@singleton()
export class PostManager implements IPostManager {
  public constructor(@inject('IPostFactory') private postFactory: IPostFactory) {
  }

  public async all(postType?: string, sortByUpdatedAt?: boolean): Promise<Post[]> {
    return (await this.postFactory.getSources().reduce(async (prev, source) => {
      const acc = await prev;
      return acc.concat(...await this.postFactory.all(source, postType));
    }, Promise.resolve([] as Post[]))).sort((a, b) => sortByUpdatedAt ? a.compareUpdatedAt(b) : a.compare(b));
  }

  public async getIds(postType?: string): Promise<Id[]> {
    return await this.postFactory.getSources().reduce(async (prev, source) => {
      const acc = await prev;
      return acc.concat(...await this.postFactory.getIds(source, postType));
    }, Promise.resolve([] as Id[]));
  }

  public async fetch(id: Id, postType?: string): Promise<PostDetail> {
    return this.postFactory.fetch(id, postType);
  }
}
