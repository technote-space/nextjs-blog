import Id from '$/domain/post/valueObject/id';
import Name from '$/domain/post/valueObject/name';
import Base from '$/domain/shared/entity/base';

export class Tag extends Base {
  private id?: Id;
  private name!: Name;

  public static reconstruct(id: Id, name: Name): Tag {
    const instance = new this();
    instance.id = id;
    instance.name = name;

    return instance;
  }

  public getId(): Id {
    this.checkNotEmpty('id');
    return this.id!;
  }

  public getName(): Name {
    return this.name;
  }
}
