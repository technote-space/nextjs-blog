import type { IPostRepository } from '$/domain/post/repository/post';
import mysql from 'serverless-mysql';
import { singleton } from 'tsyringe';
import { Post } from '$/domain/post/entity/post';
import { PostDetail } from '$/domain/post/entity/postDetail';
import Content from '$/domain/post/valueObject/content';
import CreatedAt from '$/domain/post/valueObject/createdAt';
import Id from '$/domain/post/valueObject/id';
import Source from '$/domain/post/valueObject/source';
import Title from '$/domain/post/valueObject/title';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';
import NotFoundException from '$/domain/shared/exceptions/notFound';

type PostData = {
  post_name: string;
  post_date: string;
  post_modified: string;
  post_title: string;
};
type PostDetailData = PostData & {
  post_content: string;
}

@singleton()
export class WordPressPostRepository implements IPostRepository {
  private mysql: mysql.ServerlessMysql;

  public constructor() {
    this.mysql = mysql({
      config: {
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
      },
    });
  }

  private static sourceId(): string {
    return 'wp';
  }

  public async all(): Promise<Post[]> {
    const results = await this.mysql.query<Array<PostData>>(`
      SELECT post_name, post_date, post_modified, post_title
      FROM wp_posts
      WHERE post_type = ? && post_status = ?
    `, ['post', 'publish']);
    await this.mysql.end();

    return results.map(result => Post.reconstruct(
      Id.create({
        source: Source.create(WordPressPostRepository.sourceId()),
        id: result.post_name,
      }),
      Title.create(result.post_title),
      CreatedAt.create(result.post_date),
      UpdatedAt.create(result.post_modified),
    ));
  }

  public async getIds(): Promise<Id[]> {
    const results = await this.mysql.query<Array<{ post_name: string }>>(`
      SELECT post_name
      FROM wp_posts
      WHERE post_type = ? && post_status = ?
    `, ['post', 'publish']);
    await this.mysql.end();

    return results.map(result => Id.create({
      source: Source.create(WordPressPostRepository.sourceId()),
      id: result.post_name,
    }));
  }

  public async fetch(id: Id): Promise<PostDetail> {
    const results = await this.mysql.query<Array<PostDetailData>>(`
      SELECT post_name, post_date, post_modified, post_title, post_content
      FROM wp_posts
      WHERE post_type = ? && post_status = ? && post_name = ?
    `, ['post', 'publish', id.postId]);
    await this.mysql.end();

    if (!results.length) {
      throw NotFoundException;
    }

    return PostDetail.reconstruct(
      id,
      Title.create(results[0].post_title),
      Content.create(results[0].post_content),
      CreatedAt.create(results[0].post_date),
      UpdatedAt.create(results[0].post_modified),
    );
  }
}
