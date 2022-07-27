import type { Settings } from '$/domain/app/settings';
import type { IPostRepository } from '$/domain/post/repository/post';
import type { SearchParams } from '$/domain/post/repository/post';
import type { ICodeService } from '$/domain/post/service/code';
import type { IColorService } from '$/domain/post/service/color';
import type { IOembedService } from '$/domain/post/service/oembed';
import type { _PaginationParams } from '$/domain/post/service/pagination';
import type { ITocService } from '$/domain/post/service/toc';
import { promises, existsSync, readdirSync, statSync } from 'fs';
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
import { Tag } from '$/domain/post/entity/tag';
import Content from '$/domain/post/valueObject/content';
import CreatedAt from '$/domain/post/valueObject/createdAt';
import Excerpt from '$/domain/post/valueObject/excerpt';
import Id from '$/domain/post/valueObject/id';
import PostType from '$/domain/post/valueObject/postType';
import Slug from '$/domain/post/valueObject/slug';
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
  tags?: string[];
};
type PostData = Required<Omit<MaybePost, 'updatedAt' | 'thumbnail'>>
  & Pick<MaybePost, 'updatedAt' | 'postType' | 'thumbnail'>;

// FIXME: 1度読まないと Vercel で消える
const path = process.cwd();
readdirSync(`${path}/contents`);

@singleton()
export class MarkdownPostRepository extends BasePostRepository implements IPostRepository {
  public constructor(
    @inject('Settings') settings: Settings,
    @inject('IColorService') color: IColorService,
    @inject('IOembedService') oembed: IOembedService,
    @inject('ITocService') toc: ITocService,
    @inject('ICodeService') code: ICodeService,
  ) {
    super(settings, color, oembed, toc, code);
  }

  private getExcludeIds(postType: string | undefined) {
    return (this.settings.exclude ?? [])
      .filter(setting => this.getPostType(postType) === this.getPostType(setting.postType) && setting.source.includes(this.sourceId))
      .map(setting => `${setting.id}`);
  }

  private static filterByTag(post: MaybePost, params?: SearchParams): boolean {
    const paramsTag = params?.tag;
    if (!paramsTag) {
      return true;
    }

    const postTags = post.tags;
    if (!postTags) {
      return false;
    }

    return postTags.includes(paramsTag);
  }

  private filterPost(postType: string | undefined, params?: SearchParams): (post?: MaybePost) => post is PostData {
    return (post?: MaybePost): post is PostData =>
      !!post && !!post.title && !!post.createdAt && post.published === true &&
      this.getPostType(postType) === this.getPostType(post.postType) &&
      MarkdownPostRepository.filterByTag(post, params);
  }

  private static getPostsDirectory(): string {
    return join(process.cwd(), 'contents');
  }

  private static toMaybePost(id: string, result: matter.GrayMatterFile<string>): MaybePost {
    return {
      id,
      createdAt: result.data.date,
      contentHtml: result.content,
      ...result.data,
    };
  }

  private readdirRecursively(dir = ''): string[] {
    const paths = readdirSync(join(MarkdownPostRepository.getPostsDirectory(), dir));
    const filePaths: string[] = [];
    for (const path of paths) {
      const stats = statSync(join(MarkdownPostRepository.getPostsDirectory(), dir, path));
      if (stats.isDirectory()) {
        filePaths.push(...this.readdirRecursively(join(dir, path)));
      } else if (path.endsWith('.md')) {
        filePaths.push(join(dir, path));
      }
    }

    return filePaths;
  }

  private async getPostDataList(postType: string | undefined, params?: SearchParams): Promise<PostData[]> {
    const exclude = this.getExcludeIds(postType);
    const filePaths = this.readdirRecursively();
    const posts = await filePaths.reduce(async (prev, filePath) => {
      const acc = await prev;
      if (!filePath.endsWith('.md')) {
        return acc;
      }

      const id = filePath.replace(/\.md$/, '').replace(/\//g, '-');
      if (exclude.includes(id)) {
        return acc;
      }

      const fileContents = await promises.readFile(join(MarkdownPostRepository.getPostsDirectory(), filePath), 'utf8');
      const matterResult = matter(fileContents);

      return acc.concat(MarkdownPostRepository.toMaybePost(id, matterResult));
    }, Promise.resolve([] as MaybePost[]));

    return posts.filter(this.filterPost(postType, params));
  }

  public async count(postType: string | undefined, searchParams?: SearchParams): Promise<number> {
    return (await this.getPostDataList(postType, searchParams)).length;
  }

  public async paginated(paginationParams: _PaginationParams, postType: string | undefined, searchParams?: SearchParams): Promise<Post[]> {
    return (await this.getPostDataList(postType, searchParams)).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).slice(paginationParams.skip, paginationParams.skip + paginationParams.take).map(post => Post.reconstruct(
      Id.create({
        source: Source.create(this.sourceId),
        id: post.id,
      }),
      Title.create(post.title),
      Excerpt.create(this.processExcerpt(removeMd(post.contentHtml))),
      PostType.create(this.getPostType(postType)),
      this.getThumbnail(post.thumbnail),
      CreatedAt.create(post.createdAt),
      post.updatedAt ? UpdatedAt.create(post.updatedAt) : undefined,
    ));
  }

  private static searchPost(postId: string): string | never {
    const split = postId.split('-');
    for (let pos = 0; pos < split.length; ++pos) {
      const dir = `./${split.slice(0, pos).join('/')}`;
      const name = split.slice(pos).join('-');
      const fullPath = join(MarkdownPostRepository.getPostsDirectory(), dir, `${name}.md`);
      if (existsSync(fullPath)) {
        return fullPath;
      }
    }

    throw new NotFoundException;
  }

  public async fetch(id: Id, postType: string | undefined): Promise<PostDetail> {
    const exclude = this.getExcludeIds(postType);
    if (exclude.includes(id.postId)) {
      throw new NotFoundException;
    }

    const fullPath = MarkdownPostRepository.searchPost(id.postId);
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
      Content.create(await this.processContent(id, post.contentHtml, PostType.create(this.getPostType(postType)))),
      Excerpt.create(this.processExcerpt(removeMd(post.contentHtml))),
      PostType.create(this.getPostType(postType)),
      post.tags.map(tag => Tag.reconstruct(Slug.create(tag))),
      post.thumbnail ? Thumbnail.create(post.thumbnail) : undefined,
      await this.getDominantColor(post.thumbnail),
      CreatedAt.create(post.createdAt),
      post.updatedAt ? UpdatedAt.create(post.updatedAt) : undefined,
    );
  }

  public async tags(postType: string | undefined): Promise<Tag[]> {
    return (await this.getPostDataList(postType)).flatMap(post => post.tags.map(tag => Tag.reconstruct(Slug.create(tag))));
  }
}
