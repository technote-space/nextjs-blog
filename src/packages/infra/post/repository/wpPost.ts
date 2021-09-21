import type { Settings } from '$/domain/app/settings';
import type { IPostRepository } from '$/domain/post/repository/post';
import { convert } from 'html-to-text';
import mysql from 'serverless-mysql';
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

type PostData = {
  post_name: string;
  post_date: string;
  post_modified: string;
  post_title: string;
  post_content: string;
  thumbnail_id?: string;
  thumbnail?: string;
};

@singleton()
export class WordPressPostRepository extends BasePostRepository implements IPostRepository {
  private mysql: mysql.ServerlessMysql;

  public constructor(@inject('Settings') settings: Settings) {
    super(settings);
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

  protected sourceId(): string {
    return 'wp';
  }

  public async all(): Promise<Post[]> {
    const results = await this.mysql.query<Array<PostData>>(`
      SELECT wp_posts.post_name,
             wp_posts.post_date,
             wp_posts.post_modified,
             wp_posts.post_title,
             wp_posts.post_content,
             wp_postmeta.meta_value as thumbnail_id
      FROM wp_posts
             LEFT JOIN wp_postmeta on wp_posts.ID = wp_postmeta.post_id AND wp_postmeta.meta_key = ?
      WHERE wp_posts.post_type = ? && wp_posts.post_status = ?
    `, ['_thumbnail_id', 'post', 'publish']);

    const thumbnailIds = results.map(result => result.thumbnail_id).filter(result => result).map(result => Number(result));
    const thumbnails = thumbnailIds.length ? Object.assign({}, ...(await this.mysql.query<Array<{ ID: number; guid: string }>>(`
      SELECT ID, guid
      FROM wp_posts
      WHERE ID in (${(new Array<string>(thumbnailIds.length)).fill('?').join(',')})
    `, thumbnailIds)).map(({ ID, guid }) => ({ [ID]: guid }))) : {};

    await this.mysql.end();

    return results.map(result => Post.reconstruct(
      Id.create({
        source: Source.create(this.sourceId()),
        id: result.post_name,
      }),
      Title.create(result.post_title),
      Excerpt.create(this.replace(convert(result.post_content, {
        wordwrap: null,
        selectors: [{ selector: 'pre', format: 'skip' }, { selector: 'a', format: 'inline' }],
      }))),
      result.thumbnail_id && thumbnails[result.thumbnail_id] ? Thumbnail.create(thumbnails[result.thumbnail_id]) : undefined,
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
      source: Source.create(this.sourceId()),
      id: result.post_name,
    }));
  }

  public async fetch(id: Id): Promise<PostDetail> {
    const results = await this.mysql.query<Array<PostData>>(`
      SELECT wp_posts.post_name,
             wp_posts.post_date,
             wp_posts.post_modified,
             wp_posts.post_title,
             wp_posts.post_content,
             thumbnail.guid as thumbnail
      FROM wp_posts
             LEFT JOIN wp_postmeta on wp_posts.ID = wp_postmeta.post_id AND wp_postmeta.meta_key = ?
             LEFT JOIN wp_posts thumbnail on thumbnail.ID = wp_postmeta.meta_value
      WHERE wp_posts.post_type = ? && wp_posts.post_status = ? && wp_posts.post_name = ?
    `, ['_thumbnail_id', 'post', 'publish', id.postId]);

    await this.mysql.end();

    if (!results.length) {
      throw NotFoundException;
    }

    return PostDetail.reconstruct(
      id,
      Title.create(results[0].post_title),
      Content.create(this.replace(results[0].post_content.replace(/\r\n/g, '<br />'))),
      results[0].thumbnail ? Thumbnail.create(results[0].thumbnail) : undefined,
      CreatedAt.create(results[0].post_date),
      UpdatedAt.create(results[0].post_modified),
    );
  }
}
