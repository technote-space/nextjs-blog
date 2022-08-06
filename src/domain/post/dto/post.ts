import { Post } from '@/domain/post/entity/post';
import { Tag } from '@/domain/post/entity/tag';
import CreatedAt from '@/domain/post/valueObject/createdAt';
import Excerpt from '@/domain/post/valueObject/excerpt';
import Id from '@/domain/post/valueObject/id';
import Name from '@/domain/post/valueObject/name';
import PostType from '@/domain/post/valueObject/postType';
import Slug from '@/domain/post/valueObject/slug';
import Thumbnail from '@/domain/post/valueObject/thumbnail';
import Title from '@/domain/post/valueObject/title';
import UpdatedAt from '@/domain/post/valueObject/updatedAt';

export type PostDTO = {
  id: string;
  title: string;
  excerpt: string;
  postType: string;
  tags: { slug: string; name: string }[];
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export const fromEntity = (post: Post): PostDTO => ({
  id: post.id.value,
  title: post.title.value,
  excerpt: post.excerpt.value,
  postType: post.postType.value,
  tags: post.tags.map(tag => ({ slug: tag.slug.value, name: tag.getDisplayValue() })),
  thumbnail: post.thumbnail?.value ?? null,
  createdAt: post.createdAt.value.toISOString(),
  updatedAt: post.updatedAt?.value.toISOString() ?? null,
});

export const toEntity = (post: PostDTO): Post => Post.reconstruct(
  Id.create(post.id),
  Title.create(post.title),
  Excerpt.create(post.excerpt),
  PostType.create(post.postType),
  post.tags.map(tag => Tag.reconstruct(Slug.create(tag.slug), Name.create(tag.name))),
  post.thumbnail ? Thumbnail.create(post.thumbnail) : undefined,
  CreatedAt.create(post.createdAt),
  post.updatedAt ? UpdatedAt.create(post.updatedAt) : undefined,
);
