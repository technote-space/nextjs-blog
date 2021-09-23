import type { Settings } from '$/domain/app/settings';
import type { IPostRepository } from '$/domain/post/repository/post';
import { promises, existsSync } from 'fs';
import path from 'path';
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
  contentHtml?: string;
  thumbnail?: string;
  published?: boolean;
};
type PostData = Required<Omit<MaybePost, 'updatedAt' | 'thumbnail'>> & Pick<MaybePost, 'updatedAt' | 'thumbnail'>;

@singleton()
export class MarkdownPostRepository extends BasePostRepository implements IPostRepository {
  public constructor(@inject('Settings') settings: Settings) {
    super(settings);
  }

  protected sourceId(): string {
    return 'md';
  }

  private getExcludeIds() {
    return (this.settings.exclude ?? []).filter(setting => setting.source === this.sourceId()).map(setting => setting.id);
  }

  private static filterPost(post?: MaybePost): post is PostData {
    return !!post && !!post.title && !!post.createdAt && post.published === true;
  }

  private static getPostsDirectory(): string {
    return path.join(process.cwd(), 'posts');
  }

  private static toMaybePost(id: string, result: matter.GrayMatterFile<string>): MaybePost {
    return {
      id,
      createdAt: result.data.date,
      contentHtml: result.content,
      ...result.data,
    };
  }

  public async all(): Promise<Post[]> {
    const exclude = this.getExcludeIds();
    const fileNames = await promises.readdir(MarkdownPostRepository.getPostsDirectory());
    const posts = await fileNames.reduce(async (prev, fileName) => {
      const acc = await prev;
      const id = fileName.replace(/\.md/, '');
      if (exclude.includes(id)) {
        return acc;
      }

      const fileContents = await promises.readFile(path.join(MarkdownPostRepository.getPostsDirectory(), fileName), 'utf8');
      const matterResult = matter(fileContents);

      return acc.concat(MarkdownPostRepository.toMaybePost(id, matterResult));
    }, Promise.resolve([] as MaybePost[]));

    return posts.filter(MarkdownPostRepository.filterPost).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map(post => Post.reconstruct(
      Id.create({
        source: Source.create(this.sourceId()),
        id: post.id,
      }),
      Title.create(post.title),
      Excerpt.create(this.replace(removeMd(post.contentHtml))),
      post.thumbnail ? Thumbnail.create(post.thumbnail) : undefined,
      CreatedAt.create(post.createdAt),
      post.updatedAt ? UpdatedAt.create(post.updatedAt) : undefined,
    ));
  }

  public async getIds(): Promise<Id[]> {
    const exclude = this.getExcludeIds();
    const fileNames = await promises.readdir(MarkdownPostRepository.getPostsDirectory());
    return fileNames.reduce(async (prev, fileName) => {
      const acc = await prev;
      const id = fileName.replace(/\.md$/, '');
      if (exclude.includes(id)) {
        return acc;
      }

      return acc.concat(Id.create({
        source: Source.create(this.sourceId()),
        id: fileName.replace(/\.md$/, ''),
      }));
    }, Promise.resolve([] as Id[]));
  }

  public async fetch(id: Id): Promise<PostDetail> {
    const exclude = this.getExcludeIds();
    if (exclude.includes(id.postId)) {
      throw new NotFoundException;
    }

    const fullPath = path.join(MarkdownPostRepository.getPostsDirectory(), `${id.postId}.md`);
    if (!existsSync(fullPath)) {
      throw new NotFoundException;
    }
    const fileContents = await promises.readFile(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const post = MarkdownPostRepository.toMaybePost(id.postId, matterResult);
    if (!MarkdownPostRepository.filterPost(post)) {
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
      Content.create(this.replace(post.contentHtml)),
      Excerpt.create(this.replace(removeMd(post.contentHtml))),
      post.thumbnail ? Thumbnail.create(post.thumbnail) : undefined,
      await this.getDominantColor(post.thumbnail),
      CreatedAt.create(post.createdAt),
      post.updatedAt ? UpdatedAt.create(post.updatedAt) : undefined,
    );
  }
}
