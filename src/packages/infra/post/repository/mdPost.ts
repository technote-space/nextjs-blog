import type { IPostRepository } from '$/domain/post/repository/post';
import { promises } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import removeMd from 'remove-markdown';
import { singleton } from 'tsyringe';
import { Post } from '$/domain/post/entity/post';
import { PostDetail } from '$/domain/post/entity/postDetail';
import Content from '$/domain/post/valueObject/content';
import CreatedAt from '$/domain/post/valueObject/createdAt';
import Excerpt from '$/domain/post/valueObject/excerpt';
import Id from '$/domain/post/valueObject/id';
import Source from '$/domain/post/valueObject/source';
import Title from '$/domain/post/valueObject/title';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';
import NotFoundException from '$/domain/shared/exceptions/notFound';

type MaybePost = {
  id: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  title?: string;
  contentHtml?: string;
};
type PostData = Required<Omit<MaybePost, 'updatedAt'>> & Pick<MaybePost, 'updatedAt'>;

@singleton()
export class MarkdownPostRepository implements IPostRepository {
  private static sourceId(): string {
    return 'md';
  }

  private static filterPost(post: MaybePost): post is PostData {
    return !!post.title && !!post.createdAt;
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
    const fileNames = await promises.readdir(MarkdownPostRepository.getPostsDirectory());
    const posts = await fileNames.reduce(async (prev, fileName) => {
      const acc = await prev;
      const id = fileName.replace(/\.md/, '');
      const fileContents = await promises.readFile(path.join(MarkdownPostRepository.getPostsDirectory(), fileName), 'utf8');
      const matterResult = matter(fileContents);

      return acc.concat(MarkdownPostRepository.toMaybePost(id, matterResult));
    }, Promise.resolve([] as MaybePost[]));

    return posts.filter(MarkdownPostRepository.filterPost).sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map(post => Post.reconstruct(
      Id.create({
        source: Source.create(MarkdownPostRepository.sourceId()),
        id: post.id,
      }),
      Title.create(post.title),
      Excerpt.create(removeMd(post.contentHtml)),
      undefined,
      CreatedAt.create(post.createdAt),
      post.updatedAt ? UpdatedAt.create(post.updatedAt) : undefined,
    ));
  }

  public async getIds(): Promise<Id[]> {
    const fileNames = await promises.readdir(MarkdownPostRepository.getPostsDirectory());
    return fileNames.reduce(async (prev, fileName) => {
      const acc = await prev;
      return acc.concat(Id.create({
        source: Source.create(MarkdownPostRepository.sourceId()),
        id: fileName.replace(/\.md$/, ''),
      }));
    }, Promise.resolve([] as Id[]));
  }

  public async fetch(id: Id): Promise<PostDetail> {
    const fullPath = path.join(MarkdownPostRepository.getPostsDirectory(), `${id.postId}.md`);
    const fileContents = await promises.readFile(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const post = MarkdownPostRepository.toMaybePost(id.postId, matterResult);
    if (!MarkdownPostRepository.filterPost(post)) {
      throw NotFoundException;
    }

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    post.contentHtml = processedContent.toString();

    return PostDetail.reconstruct(
      id,
      Title.create(post.title),
      Content.create(post.contentHtml),
      undefined,
      CreatedAt.create(post.createdAt),
      post.updatedAt ? UpdatedAt.create(post.updatedAt) : undefined,
    );
  }
}
