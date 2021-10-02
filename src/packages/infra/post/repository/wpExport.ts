import type { Settings } from '$/domain/app/settings';
import type { IPostRepository } from '$/domain/post/repository/post';
import type { ICodeService } from '$/domain/post/service/code';
import type { IColorService } from '$/domain/post/service/color';
import type { IHtmlService } from '$/domain/post/service/html';
import type { IOembedService } from '$/domain/post/service/oembed';
import type { IThumbnailService } from '$/domain/post/service/thumbnail';
import type { ITocService } from '$/domain/post/service/toc';
import type { IXmlService } from '$/domain/post/service/xml';
import { promises } from 'fs';
import { join } from 'path';
import { inject, singleton } from 'tsyringe';
import { Post } from '$/domain/post/entity/post';
import { PostDetail } from '$/domain/post/entity/postDetail';
import Content from '$/domain/post/valueObject/content';
import CreatedAt from '$/domain/post/valueObject/createdAt';
import Excerpt from '$/domain/post/valueObject/excerpt';
import Id from '$/domain/post/valueObject/id';
import PostType from '$/domain/post/valueObject/postType';
import Source from '$/domain/post/valueObject/source';
import Thumbnail from '$/domain/post/valueObject/thumbnail';
import Title from '$/domain/post/valueObject/title';
import NotFoundException from '$/domain/shared/exceptions/notFound';
import { BasePostRepository } from '$/infra/post/repository/base';
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
    nicename: string;
  }[]
};

@singleton()
export class WordPressExportPostRepository extends BasePostRepository implements IPostRepository {
  public constructor(
    @inject('Settings') settings: Settings,
    @inject('IColorService') color: IColorService,
    @inject('IOembedService') oembed: IOembedService,
    @inject('ITocService') toc: ITocService,
    @inject('ICodeService') code: ICodeService,
    @inject('IThumbnailService') thumbnail: IThumbnailService,
    @inject('IXmlService') private xml: IXmlService,
    @inject('IHtmlService') private html: IHtmlService,
  ) {
    super(settings, color, oembed, toc, code, thumbnail);
  }

  private async getExportXmlData(): Promise<WpXmlData> {
    return this.xml.parse<WpXmlData>(
      await promises.readFile(join(process.cwd(), this.settings.wpExportXml!.path), 'utf8'),
    );
  }

  private static getPostName(baseSiteUrl: string, item: WpXmlPostItem): string {
    const customPermalink = item.postmeta?.find(meta => meta.meta_key[0] === 'custom_permalink')?.meta_value[0];
    return (customPermalink || item.post_name[0])
      .replace(new RegExp(`^${pregQuote(`${baseSiteUrl.replace(/\/$/, '')}/`, '/')}`), '')
      .replace('/', '-');
  }

  private collectPosts(data: WpXmlData, postType?: string): PostData[] {
    const _postType = this.getPostType(postType);
    return data.rss.channel[0].item
      .filter(item => item.post_type[0] === _postType && (item.status[0] === 'publish' || item.status[0] === 'future'))
      .map(item => ({
        id: Number(item.post_id[0]),
        post_name: WordPressExportPostRepository.getPostName(data.rss.channel[0].base_site_url[0], item),
        post_date: item.post_date[0],
        post_title: item.title[0],
        post_content: item.encoded[0],
        post_excerpt: item.encoded[1],
        thumbnail: this.getThumbnailUrl(data, item.postmeta?.find(meta => meta.meta_key[0] === '_thumbnail_id')?.meta_value[0]),
        category: item.category?.map(item => item.$),
      }));
  }

  private getThumbnailUrl(data: WpXmlData, thumbnailId?: string): string | undefined {
    if (!thumbnailId) {
      return undefined;
    }

    return data.rss.channel[0].item.find(item => item.post_id[0] === thumbnailId)?.guid[0]._;
  }

  private getExcludedPosts(posts: PostData[], postType?: string): PostData[] {
    const exclude = (this.settings.exclude ?? []).filter(setting => this.getPostType(postType) === this.getPostType(setting.postType) && setting.source.includes(this.sourceId));
    const excludeIds = exclude.filter(setting => !setting.type).map(setting => Number(setting.id));
    const excludeCategory = exclude.filter(setting => !!setting.type);
    return posts.filter(post => {
      if (excludeIds.includes(post.id)) return false;
      return !post.category?.some(category => excludeCategory.some(exclude => exclude.type === category.domain && exclude.id === category.nicename));
    });
  }

  public async all(postType?: string): Promise<Post[]> {
    return this.getExcludedPosts(this.collectPosts(await this.getExportXmlData(), postType)).reduce(async (prev, result) => (await prev).concat(Post.reconstruct(
      Id.create({
        source: Source.create(this.sourceId),
        id: result.post_name,
      }),
      Title.create(result.post_title),
      Excerpt.create(this.processExcerpt(this.html.htmlToExcerpt(result.post_content))),
      PostType.create(this.getPostType(postType)),
      await this.getThumbnail(result.thumbnail),
      CreatedAt.create(result.post_date),
    )), Promise.resolve([] as Post[]));
  }

  public async getIds(postType?: string): Promise<Id[]> {
    return this.getExcludedPosts(this.collectPosts(await this.getExportXmlData(), postType)).map(result => Id.create({
      source: Source.create(this.sourceId),
      id: result.post_name,
    }));
  }

  public async fetch(id: Id, postType?: string): Promise<PostDetail> {
    const post = this.getExcludedPosts(this.collectPosts(await this.getExportXmlData(), postType)).find(post => post.post_name === id.postId);
    if (!post) {
      throw new NotFoundException;
    }

    const isClassicEditor = !/<!-- wp:/.test(post.post_content);
    const processedContent = await this.processContent(post.post_content, postType);
    return PostDetail.reconstruct(
      id,
      Title.create(post.post_title),
      Content.create(isClassicEditor ? processedContent.replace(/\r?\n/g, '<br />') : processedContent),
      Excerpt.create(this.processExcerpt(this.html.htmlToExcerpt(post.post_content))),
      PostType.create(this.getPostType(postType)),
      post.thumbnail ? Thumbnail.create(post.thumbnail) : undefined,
      await this.getDominantColor(post.thumbnail),
      CreatedAt.create(post.post_date),
    );
  }
}
