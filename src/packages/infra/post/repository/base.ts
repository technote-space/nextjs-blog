import type { Settings } from '$/domain/app/settings';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type { IPostRepository } from '$/domain/post/repository/post';
import type { IColorService } from '$/domain/post/service/color';
import type { IOembedService } from '$/domain/post/service/oembed';
import type { ITocService } from '$/domain/post/service/toc';
import type Id from '$/domain/post/valueObject/id';
import { Post } from '$/domain/post/entity/post';
import DominantColor from '$/domain/post/valueObject/dominantColor';
import { replaceAll } from '@/lib/helpers/string';
import { processExternalLinks, processLinksInCode, processOneLineLinks } from '@/lib/helpers/url';

export abstract class BasePostRepository implements IPostRepository {
  protected constructor(
    protected settings: Settings,
    protected color: IColorService,
    protected oembed: IOembedService,
    protected toc: ITocService,
  ) {
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
    return this.color.getDominantColor(thumbnail, this.settings.siteUrl, retry);
  }

  protected processExcerpt(excerpt: string): string {
    return this.replace(excerpt);
  }

  protected getPostType(postType?: string): string {
    return Post.ensurePostType(postType, this.settings);
  }

  protected async processContent(content: string, postType?: string): Promise<string> {
    return this.toc.process(
      replaceAll(this.replace(
        processExternalLinks(
          await processOneLineLinks(
            processLinksInCode(
              this.replace(content),
            ),
            url => this.oembed.process(url),
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
