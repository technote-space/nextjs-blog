import type { Settings } from '$/domain/app/settings';
import type { Post } from '$/domain/post/entity/post';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type { IPostRepository } from '$/domain/post/repository/post';
import type Id from '$/domain/post/valueObject/id';
import DominantColor from '$/domain/post/valueObject/dominantColor';
import { getDominantColor } from '@/lib/helpers/color';
import { Oembed } from '@/lib/helpers/oembed';
import { replaceAll } from '@/lib/helpers/string';
import { replaceLinks } from '@/lib/helpers/url';

export abstract class BasePostRepository implements IPostRepository {

  protected constructor(protected settings: Settings) {
  }

  private __sourceId?: string;

  protected get sourceId(): string {
    return this.__sourceId!;
  }

  protected replace(text: string): string {
    return (this.settings.replace ?? []).filter(setting => !setting.source || setting.source === this.sourceId).reduce((prev, setting) => {
      return replaceAll(prev, setting.from, setting.to);
    }, text);
  }

  protected async getDominantColor(thumbnail?: string, retry = 3): Promise<DominantColor | undefined> {
    return getDominantColor(thumbnail, retry);
  }

  protected async processLink(text: string): Promise<string> {
    return replaceLinks(text, Oembed.parse);
  }

  public setSourceId(sourceId: string): void {
    this.__sourceId = sourceId;
  }

  public abstract all(): Promise<Post[]>;

  public abstract fetch(id: Id): Promise<PostDetail>;

  public abstract getIds(): Promise<Id[]>;
}
