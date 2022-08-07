import { Tag } from '@/domain/post/entity/tag';
import Name from '@/domain/post/valueObject/name';
import Slug from '@/domain/post/valueObject/slug';

export type TagDTO = {
  slug: string;
  name: string | null;
}

export const fromEntity = (tag: Tag): TagDTO => ({
  slug: tag.slug.value,
  name: tag.name?.value ?? null,
});

export const toEntity = (tag: TagDTO): Tag => Tag.reconstruct(
  Slug.create(tag.slug),
  tag.name ? Name.create(tag.name) : undefined,
);
