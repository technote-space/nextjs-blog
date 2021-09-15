import type { Post } from '$/domain/post/entity/post';
import type { IPostFactory } from '$/domain/post/factory';
import type Id from '$/domain/post/valueObject/id';
import { singleton, inject } from 'tsyringe';
import { IPostManager } from '$/domain/post/manager';

@singleton()
export class PostManager implements IPostManager {
  public constructor(@inject('IPostFactory') private postFactory: IPostFactory) {
  }

  public async all(): Promise<Post[]> {
    return (await this.postFactory.getSources().reduce(async (prev, source) => {
      const acc = await prev;
      return acc.concat(...await this.postFactory.all(source));
    }, Promise.resolve([] as Post[]))).sort((a, b) => a.compare(b));
  }

  public async getIds(): Promise<Id[]> {
    return await this.postFactory.getSources().reduce(async (prev, source) => {
      const acc = await prev;
      return acc.concat(...await this.postFactory.getIds(source));
    }, Promise.resolve([] as Id[]));
  }

  public async fetch(id: Id): Promise<Post> {
    return this.postFactory.fetch(id);
  }
}
