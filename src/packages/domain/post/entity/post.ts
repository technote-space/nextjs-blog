import CreatedAt from '$/domain/post/valueObject/createdAt';
import Excerpt from '$/domain/post/valueObject/excerpt';
import Id from '$/domain/post/valueObject/id';
import PostType from '$/domain/post/valueObject/postType';
import Thumbnail from '$/domain/post/valueObject/thumbnail';
import Title from '$/domain/post/valueObject/title';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';
import Base from '$/domain/shared/entity/base';

export class Post extends Base() {
  private id?: Id;
  private title!: Title;
  private excerpt!: Excerpt;
  private postType!: PostType;
  private thumbnail?: Thumbnail;
  private createdAt!: CreatedAt;
  private updatedAt?: UpdatedAt;

  public static reconstruct(id: Id, title: Title, excerpt: Excerpt, postType: PostType, thumbnail: Thumbnail | undefined, createdAt: CreatedAt, updatedAt?: UpdatedAt): Post {
    const instance = new this();
    instance.id = id;
    instance.title = title;
    instance.excerpt = excerpt;
    instance.postType = postType;
    instance.thumbnail = thumbnail;
    instance.createdAt = createdAt;
    instance.updatedAt = updatedAt;

    return instance;
  }

  public getId(): Id {
    this.checkNotEmpty('id');
    return this.id!;
  }

  public getTitle(): Title {
    return this.title;
  }

  public getExcerpt(): Excerpt {
    return this.excerpt;
  }

  public getPostType(): PostType {
    return this.postType;
  }

  public getThumbnail(): Thumbnail | undefined {
    return this.thumbnail;
  }

  public getCreatedAt(): CreatedAt {
    return this.createdAt;
  }

  public getUpdatedAt(): UpdatedAt | undefined {
    return this.updatedAt;
  }

  public compare(other: this): number {
    return other.createdAt.compare(this.createdAt);
  }
}
