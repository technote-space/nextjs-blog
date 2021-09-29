import type { Settings } from '$/domain/app/settings';
import type { IPostRepository } from '$/domain/post/repository/post';
import type { IColorService } from '$/domain/post/service/color';
import type { IOembedService } from '$/domain/post/service/oembed';
import type { ITocService } from '$/domain/post/service/toc';
import mysql from 'serverless-mysql';
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
import { htmlToExcerpt } from '@/lib/helpers/string';

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

  public constructor(
    @inject('Settings') settings: Settings,
    @inject('IColorService') color: IColorService,
    @inject('IOembedService') oembed: IOembedService,
    @inject('ITocService') toc: ITocService,
  ) {
    super(settings,color, oembed, toc);
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

  private getExcludeSettings(postType?: string) {
    const excludeIds = (this.settings.exclude ?? [])
      .filter(setting => !setting.type && this.getPostType(postType) === this.getPostType(setting.postType) && setting.source === this.sourceId)
      .map(setting => Number(setting.id));
    const excludeTermTaxonomyIds = (this.settings.exclude ?? [])
      .filter(setting => this.getPostType(postType) === this.getPostType(setting.postType) && setting.source === this.sourceId && setting.type === 'term')
      .map(setting => Number(setting.id));

    const excludeIdsWhere = `${excludeIds.length ? ` && wp_posts.ID NOT IN (${Array<string>(excludeIds.length).fill('?').join(', ')})` : ''}`;
    const excludeTermTaxonomyIdsWhere = `${excludeTermTaxonomyIds.length ? ` && wp_posts.ID NOT IN (SELECT object_id FROM wp_term_relationships WHERE term_taxonomy_id IN (${Array<string>(excludeTermTaxonomyIds.length).fill('?').join(', ')}))` : ''}`;

    return {
      exclude: [...excludeIds, ...excludeTermTaxonomyIds],
      excludeWhere: excludeIdsWhere + excludeTermTaxonomyIdsWhere,
    };
  }

  public async all(postType?: string): Promise<Post[]> {
    const { exclude, excludeWhere } = this.getExcludeSettings(postType);
    const results = await this.mysql.query<Array<PostData>>(`
      SELECT REPLACE(
               TRIM(TRAILING '/' FROM
                    IF(COALESCE(permalink.meta_value, '') = '', wp_posts.post_name, permalink.meta_value)
                 ),
               '/',
               '-'
               )                  AS post_name,
             wp_posts.post_date,
             wp_posts.post_modified,
             wp_posts.post_title,
             wp_posts.post_content,
             thumbnail.meta_value as thumbnail_id
      FROM wp_posts
             LEFT JOIN wp_postmeta permalink on wp_posts.ID = permalink.post_id AND permalink.meta_key = ?
             LEFT JOIN wp_postmeta thumbnail on wp_posts.ID = thumbnail.post_id AND thumbnail.meta_key = ?
      WHERE wp_posts.post_type = ? && wp_posts.post_status = ?${excludeWhere}
    `, ['custom_permalink', '_thumbnail_id', this.getPostType(postType), 'publish', ...exclude]);

    const thumbnailIds = results.map(result => result.thumbnail_id).filter(result => result).map(result => Number(result));
    const thumbnails = thumbnailIds.length ? Object.assign({}, ...(await this.mysql.query<Array<{ ID: number; guid: string }>>(`
      SELECT ID, guid
      FROM wp_posts
      WHERE ID in (${(new Array<string>(thumbnailIds.length)).fill('?').join(',')})
    `, thumbnailIds)).map(({ ID, guid }) => ({ [ID]: guid }))) : {};

    await this.mysql.end();

    return results.map(result => Post.reconstruct(
      Id.create({
        source: Source.create(this.sourceId),
        id: result.post_name,
      }),
      Title.create(result.post_title),
      Excerpt.create(this.processExcerpt(htmlToExcerpt(result.post_content))),
      PostType.create(this.getPostType(postType)),
      result.thumbnail_id && thumbnails[result.thumbnail_id] ? Thumbnail.create(thumbnails[result.thumbnail_id]) : undefined,
      CreatedAt.create(result.post_date),
      UpdatedAt.create(result.post_modified),
    ));
  }

  public async getIds(postType?: string): Promise<Id[]> {
    const { exclude, excludeWhere } = this.getExcludeSettings(postType);
    const results = await this.mysql.query<Array<{ post_name: string }>>(`
      SELECT REPLACE(
               TRIM(TRAILING '/' FROM
                    IF(COALESCE(permalink.meta_value, '') = '', wp_posts.post_name, permalink.meta_value)
                 ),
               '/',
               '-'
               ) AS post_name
      FROM wp_posts
             LEFT JOIN wp_postmeta permalink on wp_posts.ID = permalink.post_id AND permalink.meta_key = ?
      WHERE post_type = ? && post_status = ?${excludeWhere}
    `, ['custom_permalink', this.getPostType(postType), 'publish', ...exclude]);
    await this.mysql.end();

    return results.map(result => Id.create({
      source: Source.create(this.sourceId),
      id: result.post_name,
    }));
  }

  public async fetch(id: Id, postType?: string): Promise<PostDetail> {
    const { exclude, excludeWhere } = this.getExcludeSettings(postType);
    const results = await this.mysql.query<Array<PostData>>(`
      SELECT wp_posts.post_date,
             wp_posts.post_modified,
             wp_posts.post_title,
             wp_posts.post_content,
             thumbnail_post.guid as thumbnail
      FROM wp_posts
             LEFT JOIN wp_postmeta permalink on wp_posts.ID = permalink.post_id AND permalink.meta_key = ?
             LEFT JOIN wp_postmeta on wp_posts.ID = wp_postmeta.post_id AND wp_postmeta.meta_key = ?
             LEFT JOIN wp_posts thumbnail_post on thumbnail_post.ID = wp_postmeta.meta_value
      WHERE wp_posts.post_type = ? && wp_posts.post_status = ? &&
            REPLACE(
              TRIM(TRAILING '/' FROM
                   IF(
                       COALESCE(permalink.meta_value, '') = '',
                       wp_posts.post_name,
                       permalink.meta_value
                     )
                ), '/', '-') = ?${excludeWhere}
    `, ['custom_permalink', '_thumbnail_id', this.getPostType(postType), 'publish', id.postId, ...exclude]);

    await this.mysql.end();

    if (!results.length) {
      throw new NotFoundException;
    }

    const isClassicEditor = !/<!-- wp:/.test(results[0].post_content);
    const processedContent = await this.processContent(results[0].post_content, postType);
    return PostDetail.reconstruct(
      id,
      Title.create(results[0].post_title),
      Content.create(isClassicEditor ? processedContent.replace(/\r?\n/g, '<br />') : processedContent),
      Excerpt.create(this.processExcerpt(htmlToExcerpt(results[0].post_content))),
      PostType.create(this.getPostType(postType)),
      results[0].thumbnail ? Thumbnail.create(results[0].thumbnail) : undefined,
      await this.getDominantColor(results[0].thumbnail),
      CreatedAt.create(results[0].post_date),
      UpdatedAt.create(results[0].post_modified),
    );
  }
}
