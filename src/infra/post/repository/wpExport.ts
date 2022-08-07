import type { Settings, UrlMap } from '@/domain/app/settings';
import type { IPostRepository } from '@/domain/post/repository/post';
import type { SearchParams } from '@/domain/post/repository/post';
import type { ICodeService } from '@/domain/post/service/code';
import type { IColorService } from '@/domain/post/service/color';
import type { IHtmlService } from '@/domain/post/service/html';
import type { IOembedService } from '@/domain/post/service/oembed';
import type { _PaginationParams } from '@/domain/post/service/pagination';
import type { ITocService } from '@/domain/post/service/toc';
import type { IXmlService } from '@/domain/post/service/xml';
import { promises, readdirSync } from 'fs';
import { join } from 'path';
import { inject, singleton } from 'tsyringe';
import { Post } from '@/domain/post/entity/post';
import { PostDetail } from '@/domain/post/entity/postDetail';
import { Tag } from '@/domain/post/entity/tag';
import Content from '@/domain/post/valueObject/content';
import CreatedAt from '@/domain/post/valueObject/createdAt';
import Excerpt from '@/domain/post/valueObject/excerpt';
import Id from '@/domain/post/valueObject/id';
import Name from '@/domain/post/valueObject/name';
import PostType from '@/domain/post/valueObject/postType';
import Slug from '@/domain/post/valueObject/slug';
import Source from '@/domain/post/valueObject/source';
import Thumbnail from '@/domain/post/valueObject/thumbnail';
import Title from '@/domain/post/valueObject/title';
import NotFoundException from '@/domain/shared/exceptions/notFound';
import { BasePostRepository } from '@/infra/post/repository/base';
import { pregQuote } from '@/lib/helpers/string';

type WpXmlPostItem = {
  title: string[];
  link: string[];
  pubDate: string[];
  creator: string[];
  guid: { _: string, $: { isPermaLink: string } }[];
  description: string[];
  encoded: string[]; // content, excerpt
  post_id: string[];
  post_date: string[];
  post_date_gmt: string[];
  post_name: string[];
  post_type: string[];
  status: ('publish' | 'future' | 'draft' | 'pending' | 'private' | 'trash' | 'auto-draft' | 'inherit')[];
  post_password: string[];
  category?: {
    _: string;
    $: {
      domain: 'post_tag' | 'category';
      nicename: string;
    }
  }[];
  postmeta?: {
    meta_key: string[];
    meta_value: string[];
  }[];
};
type WpXmlData = {
  rss: {
    channel: {
      base_site_url: string[];
      category: {
        term_id: string;
        category_nicename: string;
        cat_name: string;
      }[];
      tag: {
        term_id: string;
        tag_slug: string;
        tag_name: string;
      }[];
      term: {
        term_id: string;
        term_taxonomy: string;
        term_slug: string;
        term_parent: string;
        term_name: string;
      }[];
      item: WpXmlPostItem[];
    }[];
  };
}
type PostData = {
  id: number;
  post_name: string;
  post_date: string;
  post_title: string;
  post_content: string;
  post_excerpt?: string;
  thumbnail?: string;
  category?: {
    domain: 'post_tag' | 'category';
    slug: string;
    name: string;
  }[];
  link: string;
  post_type: string;
};
export type MaybeUndefined<T> = undefined extends T ? undefined : never;

// FIXME: 1度読まないと Vercel で消える
const path = process.cwd();
readdirSync(`${path}/contents`);

@singleton()
export class WordPressExportPostRepository extends BasePostRepository implements IPostRepository {
  public constructor(
    @inject('Settings') settings: Settings,
    @inject('IColorService') color: IColorService,
    @inject('IOembedService') oembed: IOembedService,
    @inject('ITocService') toc: ITocService,
    @inject('ICodeService') code: ICodeService,
    @inject('IXmlService') private xml: IXmlService,
    @inject('IHtmlService') private html: IHtmlService,
  ) {
    super(settings, color, oembed, toc, code);
  }

  private async getExportXmlData(): Promise<WpXmlData> {
    return this.xml.parse<WpXmlData>(
      await promises.readFile(join(process.cwd(), 'contents', this.settings.wpExportXml!.path), 'utf8'),
    );
  }

  private static getBaseSiteUrl(data: WpXmlData): string {
    return data.rss.channel[0].base_site_url[0].replace(/\/$/, '');
  }

  private static getPostName(baseSiteUrl: string, item: WpXmlPostItem): string {
    const customPermalink = item.postmeta?.find(meta => meta.meta_key[0] === 'custom_permalink')?.meta_value[0];
    return (customPermalink || item.post_name[0])
      .replace(new RegExp(`^${pregQuote(`${baseSiteUrl.replace(/\/$/, '')}/`, '/')}`, 'g'), '')
      .replace('/', '-');
  }

  private static filterByTag(item: WpXmlPostItem, params?: SearchParams): boolean {
    const paramsTag = params?.tag;
    if (!paramsTag) {
      return true;
    }

    const postTags = item.category?.filter(setting => setting.$.domain === 'post_tag').map(setting => setting.$.nicename);
    if (!postTags?.length) {
      return false;
    }

    return postTags.includes(paramsTag);
  }

  private collectPosts(data: WpXmlData, postType: string | undefined | null, params?: SearchParams): PostData[] {
    const _postType = postType === null ? undefined : this.getPostType(postType);
    return data.rss.channel[0].item
      .filter(item =>
        (!_postType || item.post_type[0] === _postType) &&
        (item.status[0] === 'publish' || item.status[0] === 'future') &&
        WordPressExportPostRepository.filterByTag(item, params),
      )
      .map(item => ({
        id: Number(item.post_id[0]),
        post_name: WordPressExportPostRepository.getPostName(WordPressExportPostRepository.getBaseSiteUrl(data), item),
        post_date: item.post_date[0],
        post_title: item.title[0],
        post_content: item.encoded[0],
        post_excerpt: item.encoded[1],
        thumbnail: this.getThumbnailUrl(data, item.postmeta?.find(meta => meta.meta_key[0] === '_thumbnail_id')?.meta_value[0]),
        category: item.category?.map(item => ({
          domain: item.$.domain,
          slug: item.$.nicename,
          name: item._,
        })),
        link: this.manageBaseSiteUrl(item.link[0], data),
        post_type: item.post_type[0],
      }));
  }

  private getThumbnailUrl(data: WpXmlData, thumbnailId?: string): string | undefined {
    if (!thumbnailId) {
      return undefined;
    }

    return this.manageBaseSiteUrl(data.rss.channel[0].item.find(item => item.post_id[0] === thumbnailId)?.guid[0]._, data);
  }

  private getExcludedPosts(posts: PostData[], postType: string | undefined): PostData[] {
    const _postType = this.getPostType(postType);
    const exclude = (this.settings.exclude ?? []).filter(setting => _postType === this.getPostType(setting.postType) && setting.source.includes(this.sourceId));
    const excludeIds = exclude.filter(setting => !setting.type).map(setting => Number(setting.id));
    const excludeCategory = exclude.filter(setting => !!setting.type);
    return posts.filter(post => {
      if (excludeIds.includes(post.id)) return false;
      return !post.category?.some(category => excludeCategory.some(exclude => exclude.type === category.domain && exclude.id === category.slug));
    });
  }

  public async count(postType: string | undefined, searchParams?: SearchParams): Promise<number> {
    return (this.getExcludedPosts(this.collectPosts(await this.getExportXmlData(), postType, searchParams), postType)).length;
  }

  public async paginated(paginationParams: _PaginationParams, postType: string | undefined, searchParams?: SearchParams): Promise<Post[]> {
    return this.getExcludedPosts(this.collectPosts(await this.getExportXmlData(), postType, searchParams), postType).map(post => Post.reconstruct(
      Id.create({
        source: Source.create(this.sourceId),
        id: post.post_name,
      }),
      Title.create(post.post_title),
      Excerpt.create(this.processExcerpt(this.html.htmlToExcerpt(post.post_content))),
      PostType.create(this.getPostType(postType)),
      (post.category ?? []).filter(cat => cat.domain === 'post_tag').map(cat => Tag.reconstruct(Slug.create(cat.slug), Name.create(cat.name))),
      this.getThumbnail(post.thumbnail),
      CreatedAt.create(post.post_date),
    )).sort((a, b) => a.compare(b)).slice(paginationParams.skip, paginationParams.skip + paginationParams.take);
  }

  private manageBaseSiteUrl<T extends string | undefined>(content: T, data: WpXmlData): string | MaybeUndefined<T> {
    if (content === undefined) {
      return undefined as MaybeUndefined<T>;
    }

    const assetsSiteUrl = this.settings.wpExportXml?.assetsSiteUrl;
    return content.replace(new RegExp(`(${pregQuote(WordPressExportPostRepository.getBaseSiteUrl(data), '/')})(/wp-content)?([\\w!?/+\\-_~=;.,*&@#$%()'\\[\\]]+)?`, 'g'), (match, p1, p2, p3) => {
      if (assetsSiteUrl && p2) {
        return `${assetsSiteUrl.replace(/\/$/, '')}${p3}`;
      }

      return p3;
    });
  }

  public async fetch(id: Id, postType: string | undefined): Promise<PostDetail> {
    const data = await this.getExportXmlData();
    const post = this.getExcludedPosts(this.collectPosts(data, postType), postType).find(post => post.post_name === id.postId);
    if (!post) {
      throw new NotFoundException;
    }

    const isClassicEditor = !/<!-- wp:/.test(post.post_content);
    const processedContent = this.manageBaseSiteUrl(await this.processContent(id, post.post_content, PostType.create(this.getPostType(postType))), data);
    return PostDetail.reconstruct(
      id,
      Title.create(post.post_title),
      Content.create(isClassicEditor ? processedContent.replace(/\r?\n/g, '<br />') : processedContent),
      Excerpt.create(this.processExcerpt(this.html.htmlToExcerpt(post.post_content))),
      PostType.create(this.getPostType(postType)),
      (post.category ?? []).filter(cat => cat.domain === 'post_tag').map(cat => Tag.reconstruct(Slug.create(cat.slug), Name.create(cat.name))),
      post.thumbnail ? Thumbnail.create(post.thumbnail) : undefined,
      await this.getDominantColor(post.thumbnail),
      CreatedAt.create(post.post_date),
    );
  }

  public async tags(postType: string | undefined): Promise<Tag[]> {
    return this.getExcludedPosts(this.collectPosts(await this.getExportXmlData(), postType), postType).flatMap(post => (post.category ?? []).filter(cat => cat.domain === 'post_tag').map(cat => Tag.reconstruct(Slug.create(cat.slug), Name.create(cat.name))));
  }

  public async getUrlMaps(): Promise<UrlMap[]> {
    if (!this.settings.wpExportXml?.urlMaps) {
      return [];
    }

    return this.getExcludedPosts(this.collectPosts(await this.getExportXmlData(), null), undefined).map(result => ({
      source: result.link,
      destination: {
        source: this.sourceId,
        id: result.post_name,
        postType: result.post_type,
      },
    } as UrlMap));
  }
}
