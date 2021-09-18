import type { PostDTO } from '$/domain/post/dto/post';
import { PostDetail } from '$/domain/post/entity/postDetail';
import Content from '$/domain/post/valueObject/content';
import CreatedAt from '$/domain/post/valueObject/createdAt';
import Id from '$/domain/post/valueObject/id';
import Title from '$/domain/post/valueObject/title';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';

export type PostDetailDTO = Omit<PostDTO, 'excerpt'> & {
  content: string;
}

export const fromEntity = (post: PostDetail): PostDetailDTO => ({
  id: post.getId().value,
  title: post.getTitle().value,
  content: post.getContent().value,
  createdAt: post.getCreatedAt().value.toISOString(),
  updatedAt: post.getUpdatedAt()?.value.toISOString() ?? null,
});

export const toEntity = (post: PostDetailDTO): PostDetail => PostDetail.reconstruct(
  Id.create(post.id),
  Title.create(post.title),
  Content.create(post.content),
  CreatedAt.create(post.createdAt),
  post.updatedAt ? UpdatedAt.create(post.updatedAt) : undefined,
);
