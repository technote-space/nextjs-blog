import type { Settings } from '$/domain/app/settings';
import type { IPostRepository } from '$/domain/post/repository/post';
import type { SearchParams } from '$/domain/post/repository/post';
import type { ICodeService } from '$/domain/post/service/code';
import type { IColorService } from '$/domain/post/service/color';
import type { IHtmlService } from '$/domain/post/service/html';
import type { IOembedService } from '$/domain/post/service/oembed';
import type { _PaginationParams } from '$/domain/post/service/pagination';
import type { ITocService } from '$/domain/post/service/toc';
import mysql from 'serverless-mysql';
import { inject, singleton } from 'tsyringe';
import { Post } from '$/domain/post/entity/post';
import { PostDetail } from '$/domain/post/entity/postDetail';
import { Tag } from '$/domain/post/entity/tag';
import Content from '$/domain/post/valueObject/content';
import CreatedAt from '$/domain/post/valueObject/createdAt';
import Excerpt from '$/domain/post/valueObject/excerpt';
import Id from '$/domain/post/valueObject/id';
import Name from '$/domain/post/valueObject/name';
import PostType from '$/domain/post/valueObject/postType';
import Slug from '$/domain/post/valueObject/slug';
import Source from '$/domain/post/valueObject/source';
import Thumbnail from '$/domain/post/valueObject/thumbnail';
import Title from '$/domain/post/valueObject/title';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';
import NotFoundException from '$/domain/shared/exceptions/notFound';
import { BasePostRepository } from '$/infra/post/repository/base';

type PostData = {
  id: number;
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
    @inject('ICodeService') code: ICodeService,
    @inject('IHtmlService') private html: IHtmlService,
  ) {
    super(settings, color, oembed, toc, code);
    this.mysql = mysql({
      config: settings.wpdb,
    });
  }

  private getWhere(postType: string | undefined, params?: SearchParams) {
    const excludeIds = (this.settings.exclude ?? [])
      .filter(setting => !setting.type && this.getPostType(postType) === this.getPostType(setting.postType) && setting.source.includes(this.sourceId))
      .map(setting => Number(setting.id));
    const excludeTermPostTagSlugs = (this.settings.exclude ?? [])
      .filter(setting => this.getPostType(postType) === this.getPostType(setting.postType) && setting.source.includes(this.sourceId) && setting.type === 'post_tag')
      .map(setting => setting.id);
    const excludeTermCategorySlugs = (this.settings.exclude ?? [])
      .filter(setting => this.getPostType(postType) === this.getPostType(setting.postType) && setting.source.includes(this.sourceId) && setting.type === 'category')
      .map(setting => setting.id);
    const includePostTagSlug = params?.tag ? [params.tag] : [];

    const excludeIdsWhere = `${excludeIds.length ? ` && wp_posts.ID NOT IN (${Array<string>(excludeIds.length).fill('?').join(', ')})` : ''}`;
    const excludeTermPostTagSlugsWhere = `${excludeTermPostTagSlugs.length ? ` && wp_posts.ID NOT IN (SELECT object_id FROM wp_term_relationships WHERE term_taxonomy_id IN (SELECT term_id FROM wp_term_taxonomy WHERE taxonomy = "post_tag" AND term_id IN (SELECT term_id FROM wp_terms WHERE slug IN (${Array<string>(excludeTermPostTagSlugs.length).fill('?').join(', ')}))))` : ''}`;
    const excludeTermCategorySlugsWhere = `${excludeTermCategorySlugs.length ? ` && wp_posts.ID NOT IN (SELECT object_id FROM wp_term_relationships WHERE term_taxonomy_id IN (SELECT term_id FROM wp_term_taxonomy WHERE taxonomy = "category" AND term_id IN (SELECT term_id FROM wp_terms WHERE slug IN (${Array<string>(excludeTermCategorySlugs.length).fill('?').join(', ')}))))` : ''}`;
    const includePostTagSlugWhere = params?.tag ? ` && wp_posts.ID IN (SELECT object_id FROM wp_term_relationships WHERE term_taxonomy_id IN (SELECT term_id FROM wp_term_taxonomy WHERE taxonomy = "post_tag" AND term_id IN (SELECT term_id FROM wp_terms WHERE slug = ?)))` : '';

    return {
      whereParams: [...excludeIds, ...excludeTermPostTagSlugs, ...excludeTermCategorySlugs, ...includePostTagSlug],
      whereQuery: excludeIdsWhere + excludeTermPostTagSlugsWhere + excludeTermCategorySlugsWhere + includePostTagSlugWhere,
    };
  }

  public async count(postType: string | undefined, searchParams?: SearchParams): Promise<number> {
    const { whereParams, whereQuery } = this.getWhere(postType, searchParams);
    return (await this.mysql.query<{ cnt: number }[]>(`
      SELECT COUNT(*) as cnt
      FROM wp_posts
      WHERE wp_posts.post_type = ? && (wp_posts.post_status = ? OR wp_posts.post_status = ?)${whereQuery}
    `, [this.getPostType(postType), 'publish', 'future', ...whereParams]))[0].cnt;
  }

  public async paginated(paginationParams: _PaginationParams, postType: string | undefined, searchParams?: SearchParams): Promise<Post[]> {
    const { whereParams, whereQuery } = this.getWhere(postType, searchParams);
    const results = await this.mysql.query<Array<PostData>>(`
      SELECT wp_posts.ID          as id,
             REPLACE(
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
      WHERE wp_posts.post_type = ? && (wp_posts.post_status = ? OR wp_posts.post_status = ?)${whereQuery}
      ORDER BY wp_posts.post_date DESC
      LIMIT ${paginationParams.skip}, ${paginationParams.take}
    `, ['custom_permalink', '_thumbnail_id', this.getPostType(postType), 'publish', 'future', ...whereParams]);

    const thumbnailIds = results.map(result => result.thumbnail_id).filter(result => result).map(result => Number(result));
    const thumbnails = thumbnailIds.length ? Object.assign({}, ...(await this.mysql.query<Array<{ ID: number; guid: string }>>(`
      SELECT ID, guid
      FROM wp_posts
      WHERE ID in (${(new Array<string>(thumbnailIds.length)).fill('?').join(',')})
    `, thumbnailIds)).map(({ ID, guid }) => ({ [ID]: guid }))) : {};

    await this.mysql.end();

    return results.reduce(async (prev, result) => (await prev).concat(Post.reconstruct(
      Id.create({
        source: Source.create(this.sourceId),
        id: result.post_name,
      }),
      Title.create(result.post_title),
      Excerpt.create(this.processExcerpt(this.html.htmlToExcerpt(result.post_content))),
      PostType.create(this.getPostType(postType)),
      this.getThumbnail(result.thumbnail_id ? thumbnails[result.thumbnail_id] : undefined),
      CreatedAt.create(result.post_date),
      UpdatedAt.create(result.post_modified),
    )), Promise.resolve([] as Post[]));
  }

  public async fetch(id: Id, postType: string | undefined): Promise<PostDetail> {
    const { whereParams, whereQuery } = this.getWhere(postType);
    const results = await this.mysql.query<Array<PostData>>(`
      SELECT wp_posts.ID as id,
             wp_posts.post_date,
             wp_posts.post_modified,
             wp_posts.post_title,
             wp_posts.post_content,
             thumbnail_post.guid as thumbnail
      FROM wp_posts
             LEFT JOIN wp_postmeta permalink on wp_posts.ID = permalink.post_id AND permalink.meta_key = ?
             LEFT JOIN wp_postmeta on wp_posts.ID = wp_postmeta.post_id AND wp_postmeta.meta_key = ?
             LEFT JOIN wp_posts thumbnail_post on thumbnail_post.ID = wp_postmeta.meta_value
      WHERE wp_posts.post_type = ? && (wp_posts.post_status = ? OR wp_posts.post_status = ?) &&
            REPLACE(
              TRIM(TRAILING '/' FROM
                   IF(
                       COALESCE(permalink.meta_value, '') = '',
                       wp_posts.post_name,
                       permalink.meta_value
                     )
                ), '/', '-') = ?${whereQuery}
    `, ['custom_permalink', '_thumbnail_id', this.getPostType(postType), 'publish', 'future', id.postId, ...whereParams]);

    const tags = await this.mysql.query<Array<{ slug: string; name: string }>>(`
      SELECT wp_terms.slug, wp_terms.name
      FROM wp_terms
             INNER JOIN wp_term_taxonomy tax on tax.term_id = wp_terms.term_id AND tax.taxonomy = ?
             INNER JOIN wp_term_relationships rel on rel.term_taxonomy_id = tax.term_taxonomy_id
             INNER JOIN wp_posts on wp_posts.ID = rel.object_id
      WHERE wp_posts.id = ?
    `, ['post_tag', results[0].id]);

    await this.mysql.end();

    if (!results.length) {
      throw new NotFoundException;
    }

    const isClassicEditor = !/<!-- wp:/.test(results[0].post_content);
    const processedContent = await this.processContent(id, results[0].post_content, PostType.create(this.getPostType(postType)));
    return PostDetail.reconstruct(
      id,
      Title.create(results[0].post_title),
      Content.create(isClassicEditor ? processedContent.replace(/\r?\n/g, '<br />') : processedContent),
      Excerpt.create(this.processExcerpt(this.html.htmlToExcerpt(results[0].post_content))),
      PostType.create(this.getPostType(postType)),
      tags.map(tag => Tag.reconstruct(Slug.create(tag.slug), Name.create(tag.name))),
      results[0].thumbnail ? Thumbnail.create(results[0].thumbnail) : undefined,
      await this.getDominantColor(results[0].thumbnail),
      CreatedAt.create(results[0].post_date),
      UpdatedAt.create(results[0].post_modified),
    );
  }

  public async tags(postType: string | undefined): Promise<Tag[]> {
    const { whereParams, whereQuery } = this.getWhere(postType);
    const results = await this.mysql.query<Array<{ slug: string; name: string }>>(`
      SELECT DISTINCT wp_terms.slug, wp_terms.name
      FROM wp_terms
             INNER JOIN wp_term_taxonomy tax on tax.term_id = wp_terms.term_id AND tax.taxonomy = ?
             INNER JOIN wp_term_relationships rel on rel.term_taxonomy_id = tax.term_taxonomy_id
             INNER JOIN wp_posts on wp_posts.ID = rel.object_id
      WHERE wp_posts.post_type = ? && (wp_posts.post_status = ? OR wp_posts.post_status = ?) ${whereQuery}
    `, ['post_tag', this.getPostType(postType), 'publish', 'future', ...whereParams]);

    await this.mysql.end();

    return results.map(item => Tag.reconstruct(Slug.create(item.slug), Name.create(item.name)));
  }
}
