import type { Settings, UrlMap } from '$/domain/app/settings';
import type { PostDetail } from '$/domain/post/entity/postDetail';
import type { Tag } from '$/domain/post/entity/tag';
import type { IPostRepository, SearchParams } from '$/domain/post/repository/post';
import type { ICodeService } from '$/domain/post/service/code';
import type { IColorService } from '$/domain/post/service/color';
import type { IOembedService } from '$/domain/post/service/oembed';
import type { _PaginationParams } from '$/domain/post/service/pagination';
import type { ITocService } from '$/domain/post/service/toc';
import type Id from '$/domain/post/valueObject/id';
import { Post } from '$/domain/post/entity/post';
import DominantColor from '$/domain/post/valueObject/dominantColor';
import Thumbnail from '$/domain/post/valueObject/thumbnail';
import { replaceAll } from '@/lib/helpers/string';
import { processExternalLinks, processLinksInCode, processOneLineLinks } from '@/lib/helpers/url';

export abstract class BasePostRepository implements IPostRepository {
  protected constructor(
    protected settings: Settings,
    protected color: IColorService,
    protected oembed: IOembedService,
    protected toc: ITocService,
    protected code: ICodeService,
  ) {
  }

  private __sourceId?: string;

  protected get sourceId(): string {
    return this.__sourceId!;
  }

  private replace(text: string): string {
    return (this.settings.replace ?? []).filter(setting => !setting.source || setting.source.includes(this.sourceId)).reduce((prev, setting) => {
      return replaceAll(prev, setting.from, setting.to);
    }, text);
  }

  protected async getDominantColor(thumbnail?: string, retry = 3): Promise<DominantColor | undefined> {
    return this.color.getDominantColor(thumbnail, this.settings.siteUrl, retry);
  }

  protected getThumbnail(thumbnail?: string): Thumbnail | undefined {
    if (!thumbnail) {
      return undefined;
    }

    return Thumbnail.create(thumbnail);
  }

  protected processExcerpt(excerpt: string): string {
    return this.replace(excerpt);
  }

  protected getPostType(postType: string | undefined): string {
    return Post.ensurePostType(postType, this.settings);
  }

  protected getContentFilters(): Array<{ tag: string; filter: (content: string, postType: string | undefined) => Promise<string> }> {
    return [
      { tag: 'pre-replace', filter: async content => this.replace(content) },
      { tag: 'processLinksInCode', filter: async content => processLinksInCode(content) },
      {
        tag: 'processOneLineLinks',
        filter: async content => processOneLineLinks(content, url => this.oembed.process(url)),
      },
      { tag: 'processExternalLinks', filter: async content => processExternalLinks(content) },
      { tag: 'replace-h1', filter: async content => replaceAll(content, /(<\/?)h1([^>]*?>)/, '$1h2$2') },
      { tag: 'code', filter: async content => this.code.process(content) },
      {
        tag: 'toc',
        filter: async (content, postType) => this.toc.process(content, !this.settings.toc?.postTypes || this.settings.toc.postTypes.includes(this.getPostType(postType)) ? this.settings.toc?.headings : []),
      },
      { tag: 'replace', filter: async content => this.replace(content) },
    ];
  }

  protected async processContent(content: string, postType: string | undefined): Promise<string> {
    return this.getContentFilters().reduce(async (prev, { filter }) => {
      const acc = await prev;
      return await filter(acc, postType);
    }, Promise.resolve(content));
  }

  public setSourceId(sourceId: string): void {
    this.__sourceId = sourceId;
  }

  public abstract count(postType: string | undefined, searchParams?: SearchParams): Promise<number>;

  public abstract paginated(paginationParams: _PaginationParams, postType: string | undefined, searchParams?: SearchParams): Promise<Post[]>;

  public abstract fetch(id: Id, postType: string | undefined): Promise<PostDetail>;

  public abstract tags(postType: string | undefined): Promise<Tag[]>;

  public async getUrlMaps(): Promise<UrlMap[]> {
    return [];
  }
}
