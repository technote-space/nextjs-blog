import type { Settings } from '$/domain/app/settings';
import type { Post } from '$/domain/post/entity/post';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type { IPostRepository } from '$/domain/post/repository/post';
import type Id from '$/domain/post/valueObject/id';

export abstract class BasePostRepository implements IPostRepository {
  protected constructor(protected settings: Settings) {
  }

  protected abstract sourceId(): string;

  // TODO: Add test
  protected replace(text: string): string {
    return (this.settings.replace ?? []).filter(setting => !setting.source || setting.source === this.sourceId()).reduce((prev, setting) => {
      if (typeof setting.from === 'string') {
        return prev.split(setting.from).join(setting.to);
      }

      return prev.replace(setting.from, setting.to);
    }, text);
  }

  public abstract all(): Promise<Post[]>;

  public abstract fetch(id: Id): Promise<PostDetail>;

  public abstract getIds(): Promise<Id[]>;
}
