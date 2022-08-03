import type { PostData, Settings } from '$/domain/app/settings';
import type Date from '@technote-space/vo-entity-ts/dist/valueObject/date';
import Entity from '@technote-space/vo-entity-ts/dist/entity';
import CreatedAt from '$/domain/post/valueObject/createdAt';
import Excerpt from '$/domain/post/valueObject/excerpt';
import Id from '$/domain/post/valueObject/id';
import PostType from '$/domain/post/valueObject/postType';
import Source from '$/domain/post/valueObject/source';
import Thumbnail from '$/domain/post/valueObject/thumbnail';
import Title from '$/domain/post/valueObject/title';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';

export class Post extends Entity {
  public constructor(
    public readonly id: Id,
    public readonly title: Title,
    public readonly excerpt: Excerpt,
    public readonly postType: PostType,
    public readonly thumbnail: Thumbnail | undefined,
    public readonly createdAt: CreatedAt,
    public readonly updatedAt: UpdatedAt | undefined,
  ) {
    super();
  }

  public equals(other: Post): boolean {
    return this.id.equals(other.id);
  }

  public static reconstruct(
    id: Id,
    title: Title,
    excerpt: Excerpt,
    postType: PostType,
    thumbnail: Thumbnail | undefined,
    createdAt: CreatedAt,
    updatedAt?: UpdatedAt,
  ): Post {
    return Post._reconstruct(id, title, excerpt, postType, thumbnail, createdAt, updatedAt);
  }

  public compare(other: this): number {
    return other.createdAt.compare(this.createdAt);
  }

  public compareUpdatedAt(other: this): number {
    return ((other.updatedAt ?? other.createdAt) as Date).compare(this.updatedAt ?? this.createdAt);
  }

  public getUrl(): string {
    return Post.createUrl(this.id, this.postType);
  }

  public static createUrl(id: Id, postType: PostType): string {
    return `/${postType.pluralized}/${encodeURIComponent(id.value)}/`;
  }

  public static ensurePostType(postType: string | undefined, settings: Settings): string {
    return postType ?? settings.postType?.default ?? PostType.DEFAULT_POST_TYPE;
  }

  public static isDefaultPostType(postType: string | undefined, settings: Settings): boolean {
    return !postType || postType === (settings.postType?.default ?? PostType.DEFAULT_POST_TYPE);
  }

  public static createUrlFromPostData(postData: PostData<string>, settings: Settings): string {
    return Post.createUrl(Id.create({
      source: Source.create(postData.source),
      id: postData.id,
    }), PostType.create(Post.ensurePostType(postData.postType, settings)));
  }
}
