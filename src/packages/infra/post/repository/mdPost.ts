import type { Settings } from '$/domain/app/settings';
import type { IPostRepository } from '$/domain/post/repository/post';
import type { ICodeService } from '$/domain/post/service/code';
import type { IColorService } from '$/domain/post/service/color';
import type { IOembedService } from '$/domain/post/service/oembed';
import type { IThumbnailService } from '$/domain/post/service/thumbnail';
import type { ITocService } from '$/domain/post/service/toc';
import { promises, existsSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import rehypeStringify from 'rehype-stringify';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import removeMd from 'remove-markdown';
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
import UpdatedAt from '$/domain/post/valueObject/updatedAt';
import NotFoundException from '$/domain/shared/exceptions/notFound';
import { BasePostRepository } from '$/infra/post/repository/base';

type MaybePost = {
  id: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  title?: string;
  postType?: string;
  contentHtml?: string;
  thumbnail?: string;
  published?: boolean;
};
type PostData = Required<Omit<MaybePost, 'updatedAt' | 'thumbnail'>>
  & Pick<MaybePost, 'updatedAt' | 'postType' | 'thumbnail'>;

@singleton()
export class MarkdownPostRepository extends BasePostRepository implements IPostRepository {
  public constructor(
    @inject('Settings') settings: Settings,
    @inject('IColorService') color: IColorService,
    @inject('IOembedService') oembed: IOembedService,
    @inject('ITocService') toc: ITocService,
    @inject('ICodeService') code: ICodeService,
    @inject('IThumbnailService') thumbnail: IThumbnailService,
  ) {
    super(settings, color, oembed, toc, code, thumbnail);
  }

  private getExcludeIds(postType?: string) {
    return (this.settings.exclude ?? [])
      .filter(setting => this.getPostType(postType) === this.getPostType(setting.postType) && setting.source.includes(this.sourceId))
      .map(setting => `${setting.id}`);
  }

  private filterPost(postType?: string): (post?: MaybePost) => post is PostData {
    return (post?: MaybePost): post is PostData => !!post && !!post.title && !!post.createdAt && post.published === true && this.getPostType(postType) === this.getPostType(post.postType);
  }

  private static getPostsDirectory(): string {
    return process.env.VERCEL ? join(process.cwd(), '_next', 'posts') : join(process.cwd(), 'posts');
  }

  private static toMaybePost(id: string, result: matter.GrayMatterFile<string>): MaybePost {
    return {
      id,
      createdAt: result.data.date,
      contentHtml: result.content,
      ...result.data,
    };
  }

  private async getPostDataList(postType?: string): Promise<PostData[]> {
    const exclude = this.getExcludeIds(postType);
    const fileNames = await promises.readdir(MarkdownPostRepository.getPostsDirectory());
    const posts = await fileNames.reduce(async (prev, fileName) => {
      const acc = await prev;
      if (!fileName.endsWith('.md')) {
        return acc;
      }

      const id = fileName.replace(/\.md$/, '');
      if (exclude.includes(id)) {
        return acc;
      }

      const fileContents = await promises.readFile(join(MarkdownPostRepository.getPostsDirectory(), fileName), 'utf8');
      const matterResult = matter(fileContents);

      return acc.concat(MarkdownPostRepository.toMaybePost(id, matterResult));
    }, Promise.resolve([] as MaybePost[]));

    return posts.filter(this.filterPost(postType));
  }

  public async all(postType?: string): Promise<Post[]> {
    return (await this.getPostDataList(postType)).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).reduce(async (prev, post) => (await prev).concat(Post.reconstruct(
      Id.create({
        source: Source.create(this.sourceId),
        id: post.id,
      }),
      Title.create(post.title),
      Excerpt.create(this.processExcerpt(removeMd(post.contentHtml))),
      PostType.create(this.getPostType(postType)),
      await this.getThumbnail(post.thumbnail),
      CreatedAt.create(post.createdAt),
      post.updatedAt ? UpdatedAt.create(post.updatedAt) : undefined,
    )), Promise.resolve([] as Post[]));
  }

  public async getIds(postType?: string): Promise<Id[]> {
    return (await this.getPostDataList(postType)).map(post => Id.create({
      source: Source.create(this.sourceId),
      id: post.id,
    }));
  }

  public async fetch(id: Id, postType?: string): Promise<PostDetail> {
    const exclude = this.getExcludeIds(postType);
    if (exclude.includes(id.postId)) {
      throw new NotFoundException;
    }

    const fullPath = join(MarkdownPostRepository.getPostsDirectory(), `${id.postId}.md`);
    if (!existsSync(fullPath)) {
      throw new NotFoundException;
    }
    const fileContents = await promises.readFile(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const post = MarkdownPostRepository.toMaybePost(id.postId, matterResult);
    if (!this.filterPost(postType)(post)) {
      throw new NotFoundException;
    }

    const processedContent = await remark()
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeStringify)
      .process(matterResult.content);
    post.contentHtml = processedContent.toString();

    return PostDetail.reconstruct(
      id,
      Title.create(post.title),
      Content.create(await this.processContent(post.contentHtml, postType)),
      Excerpt.create(this.processExcerpt(removeMd(post.contentHtml))),
      PostType.create(this.getPostType(postType)),
      post.thumbnail ? Thumbnail.create(post.thumbnail) : undefined,
      await this.getDominantColor(post.thumbnail),
      CreatedAt.create(post.createdAt),
      post.updatedAt ? UpdatedAt.create(post.updatedAt) : undefined,
    );
  }
}
