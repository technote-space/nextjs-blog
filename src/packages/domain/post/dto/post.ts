import { Post } from '$/domain/post/entity/post';
import Id from '$/domain/post/valueObject/id';
import Title from '$/domain/post/valueObject/title';
import Content from '$/domain/post/valueObject/content';
import CreatedAt from '$/domain/post/valueObject/createdAt';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';

export type PostDTO = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string | null;
}

export const fromEntity = (post: Post): PostDTO => ({
  id: post.getId().value,
  title: post.getTitle().value,
  content: post.getContent().value,
  createdAt: post.getCreatedAt().value.toISOString(),
  updatedAt: post.getUpdatedAt()?.value.toISOString() ?? null,
});

export const toEntity = (post: PostDTO): Post => Post.reconstruct(
  Id.create(post.id),
  Title.create(post.title),
  Content.create(post.content),
  CreatedAt.create(post.createdAt),
  post.updatedAt ? UpdatedAt.create(post.updatedAt) : undefined,
);
