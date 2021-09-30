import type { PostDTO } from '$/domain/post/dto/post';
import { PostDetail } from '$/domain/post/entity/postDetail';
import Content from '$/domain/post/valueObject/content';
import CreatedAt from '$/domain/post/valueObject/createdAt';
import DominantColor from '$/domain/post/valueObject/dominantColor';
import Excerpt from '$/domain/post/valueObject/excerpt';
import Id from '$/domain/post/valueObject/id';
import PostType from '$/domain/post/valueObject/postType';
import Thumbnail from '$/domain/post/valueObject/thumbnail';
import Title from '$/domain/post/valueObject/title';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';

export type PostDetailDTO = PostDTO & {
  content: string;
  dominantColor: string | null;
}

export const fromEntity = async (post: PostDetail): Promise<PostDetailDTO> => {
  return {
    id: post.getId().value,
    title: post.getTitle().value,
    content: post.getContent().value,
    excerpt: post.getExcerpt().value,
    postType: post.getPostType().value,
    thumbnail: post.getThumbnail()?.value ?? null,
    dominantColor: post.getDominantColor()?.value ?? null,
    createdAt: post.getCreatedAt().value.toISOString(),
    updatedAt: post.getUpdatedAt()?.value.toISOString() ?? null,
  };
};

export const toEntity = (post: PostDetailDTO): PostDetail => PostDetail.reconstruct(
  Id.create(post.id),
  Title.create(post.title),
  Content.create(post.content),
  Excerpt.create(post.excerpt),
  PostType.create(post.postType),
  post.thumbnail ? Thumbnail.create(post.thumbnail) : undefined,
  post.dominantColor ? DominantColor.create(post.dominantColor) : undefined,
  CreatedAt.create(post.createdAt),
  post.updatedAt ? UpdatedAt.create(post.updatedAt) : undefined,
);
