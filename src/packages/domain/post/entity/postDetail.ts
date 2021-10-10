import { Post } from '$/domain/post/entity/post';
import Content from '$/domain/post/valueObject/content';
import CreatedAt from '$/domain/post/valueObject/createdAt';
import DominantColor from '$/domain/post/valueObject/dominantColor';
import Excerpt from '$/domain/post/valueObject/excerpt';
import Id from '$/domain/post/valueObject/id';
import PostType from '$/domain/post/valueObject/postType';
import Thumbnail from '$/domain/post/valueObject/thumbnail';
import Title from '$/domain/post/valueObject/title';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';
import Base from '$/domain/shared/entity/base';

export class PostDetail extends Base {
  private id?: Id;
  private title!: Title;
  private content!: Content;
  private excerpt!: Excerpt;
  private postType!: PostType;
  private thumbnail?: Thumbnail;
  private dominantColor?: DominantColor;
  private createdAt!: CreatedAt;
  private updatedAt?: UpdatedAt;

  public static create(title: Title, content: Content, excerpt: Excerpt, postType: PostType, thumbnail?: Thumbnail, dominantColor?: DominantColor): PostDetail | never {
    const instance = new this();
    instance.title = title;
    instance.content = content;
    instance.excerpt = excerpt;
    instance.postType = postType;
    instance.thumbnail = thumbnail;
    instance.dominantColor = dominantColor;
    instance.createdAt = CreatedAt.create(undefined);
    instance.updatedAt = UpdatedAt.create(undefined);
    instance.validate();

    return instance;
  }

  public static reconstruct(id: Id, title: Title, content: Content, excerpt: Excerpt, postType: PostType, thumbnail: Thumbnail | undefined, dominantColor: DominantColor | undefined, createdAt: CreatedAt, updatedAt?: UpdatedAt): PostDetail {
    const instance = new this();
    instance.id = id;
    instance.title = title;
    instance.content = content;
    instance.excerpt = excerpt;
    instance.postType = postType;
    instance.thumbnail = thumbnail;
    instance.dominantColor = dominantColor;
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

  public getContent(): Content {
    return this.content;
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

  public getDominantColor(): DominantColor | undefined {
    return this.dominantColor;
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

  public getUrl(): string {
    return Post.createUrl(this.getId(), this.getPostType());
  }
}
