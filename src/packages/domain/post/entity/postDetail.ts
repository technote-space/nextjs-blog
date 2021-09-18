import Content from '$/domain/post/valueObject/content';
import CreatedAt from '$/domain/post/valueObject/createdAt';
import Id from '$/domain/post/valueObject/id';
import Thumbnail from '$/domain/post/valueObject/thumbnail';
import Title from '$/domain/post/valueObject/title';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';
import Base from '$/domain/shared/entity/base';

export class PostDetail extends Base() {
  private id?: Id;
  private title!: Title;
  private content!: Content;
  private thumbnail?: Thumbnail;
  private createdAt!: CreatedAt;
  private updatedAt?: UpdatedAt;

  public static create(title: Title, content: Content, thumbnail?: Thumbnail): PostDetail | never {
    const instance = new this();
    instance.title = title;
    instance.content = content;
    instance.thumbnail = thumbnail;
    instance.createdAt = CreatedAt.create(undefined);
    instance.updatedAt = UpdatedAt.create(undefined);
    instance.validate();

    return instance;
  }

  public static reconstruct(id: Id, title: Title, content: Content, thumbnail: Thumbnail | undefined, createdAt: CreatedAt, updatedAt?: UpdatedAt): PostDetail {
    const instance = new this();
    instance.id = id;
    instance.title = title;
    instance.content = content;
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

  public getContent(): Content {
    return this.content;
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
