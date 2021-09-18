import CreatedAt from '$/domain/post/valueObject/createdAt';
import Id from '$/domain/post/valueObject/id';
import Title from '$/domain/post/valueObject/title';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';
import Base from '$/domain/shared/entity/base';

export class Post extends Base() {
  private id?: Id;
  private title!: Title;
  private createdAt!: CreatedAt;
  private updatedAt?: UpdatedAt;

  public static create(title: Title): Post | never {
    const instance = new this();
    instance.title = title;
    instance.createdAt = CreatedAt.create(undefined);
    instance.updatedAt = UpdatedAt.create(undefined);
    instance.validate();

    return instance;
  }

  public static reconstruct(id: Id, title: Title, createdAt: CreatedAt, updatedAt?: UpdatedAt): Post {
    const instance = new this();
    instance.id = id;
    instance.title = title;
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
