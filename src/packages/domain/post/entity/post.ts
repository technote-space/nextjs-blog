import CreatedAt from '$/domain/post/valueObject/createdAt';
import Excerpt from '$/domain/post/valueObject/excerpt';
import Id from '$/domain/post/valueObject/id';
import Title from '$/domain/post/valueObject/title';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';
import Base from '$/domain/shared/entity/base';

export class Post extends Base() {
  private id?: Id;
  private title!: Title;
  private excerpt!: Excerpt;
  private createdAt!: CreatedAt;
  private updatedAt?: UpdatedAt;

  public static create(title: Title, excerpt: Excerpt): Post | never {
    const instance = new this();
    instance.title = title;
    instance.excerpt = excerpt;
    instance.createdAt = CreatedAt.create(undefined);
    instance.updatedAt = UpdatedAt.create(undefined);
    instance.validate();

    return instance;
  }

  public static reconstruct(id: Id, title: Title, excerpt: Excerpt, createdAt: CreatedAt, updatedAt?: UpdatedAt): Post {
    const instance = new this();
    instance.id = id;
    instance.title = title;
    instance.excerpt = excerpt;
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
