import Entity from '@technote-space/vo-entity-ts/dist/entity';
import Name from '$/domain/post/valueObject/name';
import Slug from '$/domain/post/valueObject/slug';

export class Tag extends Entity {
  public constructor(
    public readonly slug: Slug,
    public readonly name?: Name,
  ) {
    super();
  }

  public equals(other: Tag): boolean {
    return this.slug.equals(other.slug);
  }

  public static reconstruct(slug: Slug, name?: Name): Tag {
    return Tag._reconstruct(slug, name);
  }

  public getDisplayValue(): string {
    return this.name ? this.name.value : this.slug.value;
  }
}
