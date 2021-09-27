import type { Settings } from '$/domain/app/settings';
import type { Post } from '$/domain/post/entity/post';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type { IPostRepository } from '$/domain/post/repository/post';
import type Id from '$/domain/post/valueObject/id';
import DominantColor from '$/domain/post/valueObject/dominantColor';
import PostType from '$/domain/post/valueObject/postType';
import { getDominantColor } from '@/lib/helpers/color';
import { Oembed } from '@/lib/helpers/oembed';
import { replaceAll } from '@/lib/helpers/string';
import { addToc } from '@/lib/helpers/toc';
import { processExternalLinks, processLinksInCode, processOneLineLinks } from '@/lib/helpers/url';

export abstract class BasePostRepository implements IPostRepository {

  protected constructor(protected settings: Settings) {
  }

  private __sourceId?: string;

  protected get sourceId(): string {
    return this.__sourceId!;
  }

  private replace(text: string): string {
    return (this.settings.replace ?? []).filter(setting => !setting.source || setting.source === this.sourceId).reduce((prev, setting) => {
      return replaceAll(prev, setting.from, setting.to);
    }, text);
  }

  protected async getDominantColor(thumbnail?: string, retry = 3): Promise<DominantColor | undefined> {
    return getDominantColor(thumbnail, this.settings.siteUrl, retry);
  }

  protected processExcerpt(excerpt: string): string {
    return this.replace(excerpt);
  }

  private get defaultPostType(): string {
    return this.settings.postType?.default ?? PostType.DEFAULT_POST_TYPE;
  }

  protected getPostType(postType?: string): string {
    return postType ?? this.defaultPostType;
  }

  protected async processContent(content: string, postType?: string): Promise<string> {
    return addToc(
      replaceAll(this.replace(
        processExternalLinks(
          await processOneLineLinks(
            processLinksInCode(
              this.replace(content),
            ),
            Oembed.parse,
          ),
        ),
      ), /(<\/?)h1([^>]*?>)/, '$1h2$2'),
      !this.settings.toc?.postTypes || this.settings.toc.postTypes.includes(this.getPostType(postType)) ? this.settings.toc?.headings : [],
    );
  }

  public setSourceId(sourceId: string): void {
    this.__sourceId = sourceId;
  }

  public abstract all(postType?: string): Promise<Post[]>;

  public abstract getIds(postType?: string): Promise<Id[]>;

  public abstract fetch(id: Id, postType?: string): Promise<PostDetail>;
}
