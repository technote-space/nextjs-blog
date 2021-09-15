import Base from '$/domain/shared/entity/base';
import Id from '$/domain/post/valueObject/id';
import Title from '$/domain/post/valueObject/title';
import Content from '$/domain/post/valueObject/content';
import CreatedAt from '$/domain/post/valueObject/createdAt';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';

export class Post extends Base() {
  private id?: Id;
  private title!: Title;
  private content!: Content;
  private createdAt!: CreatedAt;
  private updatedAt?: UpdatedAt;

  public static create(title: Title, content: Content): Post | never {
    const instance = new this();
    instance.title = title;
    instance.content = content;
    instance.createdAt = CreatedAt.create(undefined);
    instance.updatedAt = UpdatedAt.create(undefined);
    instance.validate();

    return instance;
  }

  public static reconstruct(id: Id, title: Title, content: Content, createdAt: CreatedAt, updatedAt?: UpdatedAt): Post {
    const instance = new this();
    instance.id = id;
    instance.title = title;
    instance.content = content;
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
