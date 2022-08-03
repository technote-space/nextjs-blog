import Entity from '@technote-space/vo-entity-ts/dist/entity';
import { Post } from '$/domain/post/entity/post';
import { Tag } from '$/domain/post/entity/tag';
import Content from '$/domain/post/valueObject/content';
import CreatedAt from '$/domain/post/valueObject/createdAt';
import DominantColor from '$/domain/post/valueObject/dominantColor';
import Excerpt from '$/domain/post/valueObject/excerpt';
import Id from '$/domain/post/valueObject/id';
import PostType from '$/domain/post/valueObject/postType';
import Thumbnail from '$/domain/post/valueObject/thumbnail';
import Title from '$/domain/post/valueObject/title';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';

export class PostDetail extends Entity {
  public constructor(
    public readonly id: Id,
    public readonly title: Title,
    public readonly content: Content,
    public readonly excerpt: Excerpt,
    public readonly postType: PostType,
    public readonly thumbnail: Thumbnail | undefined,
    public readonly tags: Tag[],
    public readonly dominantColor: DominantColor | undefined,
    public readonly createdAt: CreatedAt,
    public readonly updatedAt: UpdatedAt | undefined,
  ) {
    super();
  }

  public equals(other: PostDetail): boolean {
    return this.id.equals(other.id);
  }

  public static reconstruct(
    id: Id,
    title: Title,
    content: Content,
    excerpt: Excerpt,
    postType: PostType,
    tags: Tag[],
    thumbnail: Thumbnail | undefined,
    dominantColor: DominantColor | undefined,
    createdAt: CreatedAt,
    updatedAt?: UpdatedAt,
  ): PostDetail {
    return PostDetail.reconstruct(id, title, content, excerpt, postType, tags, thumbnail, dominantColor, createdAt, updatedAt);
  }

  public compare(other: this): number {
    return other.createdAt.compare(this.createdAt);
  }

  public getUrl(): string {
    return Post.createUrl(this.id, this.postType);
  }
}
