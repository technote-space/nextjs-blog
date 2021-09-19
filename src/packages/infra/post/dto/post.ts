import { Post } from '$/domain/post/entity/post';
import CreatedAt from '$/domain/post/valueObject/createdAt';
import Excerpt from '$/domain/post/valueObject/excerpt';
import Id from '$/domain/post/valueObject/id';
import Thumbnail from '$/domain/post/valueObject/thumbnail';
import Title from '$/domain/post/valueObject/title';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';

export type PostDTO = {
  id: string;
  title: string;
  excerpt: string;
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export const fromEntity = (post: Post): PostDTO => ({
  id: post.getId().value,
  title: post.getTitle().value,
  excerpt: post.getExcerpt().value,
  thumbnail: post.getThumbnail()?.value ?? null,
  createdAt: post.getCreatedAt().value.toISOString(),
  updatedAt: post.getUpdatedAt()?.value.toISOString() ?? null,
});

export const toEntity = (post: PostDTO): Post => Post.reconstruct(
  Id.create(post.id),
  Title.create(post.title),
  Excerpt.create(post.excerpt),
  post.thumbnail ? Thumbnail.create(post.thumbnail) : undefined,
  CreatedAt.create(post.createdAt),
  post.updatedAt ? UpdatedAt.create(post.updatedAt) : undefined,
);