import Name from '$/domain/post/valueObject/name';
import Slug from '$/domain/post/valueObject/slug';
import Base from '$/domain/shared/entity/base';

export class Tag extends Base {
  private slug!: Slug;
  private name?: Name;

  public static reconstruct(slug: Slug, name?: Name): Tag {
    const instance = new this();
    instance.slug = slug;
    instance.name = name;

    return instance;
  }

  public getSlug(): Slug {
    return this.slug;
  }

  public getName(): Name | undefined {
    return this.name;
  }

  public getDisplayValue(): string {
    return this.name ? this.name.value : this.slug.value;
  }
}
