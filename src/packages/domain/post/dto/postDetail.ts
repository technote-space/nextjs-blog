import type { PostDTO } from '$/domain/post/dto/post';
import { PostDetail } from '$/domain/post/entity/postDetail';
import { Tag } from '$/domain/post/entity/tag';
import Content from '$/domain/post/valueObject/content';
import CreatedAt from '$/domain/post/valueObject/createdAt';
import DominantColor from '$/domain/post/valueObject/dominantColor';
import Excerpt from '$/domain/post/valueObject/excerpt';
import Id from '$/domain/post/valueObject/id';
import Name from '$/domain/post/valueObject/name';
import PostType from '$/domain/post/valueObject/postType';
import Slug from '$/domain/post/valueObject/slug';
import Thumbnail from '$/domain/post/valueObject/thumbnail';
import Title from '$/domain/post/valueObject/title';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';

export type PostDetailDTO = PostDTO & {
  content: string;
  dominantColor: string | null;
  tags: { slug: string; name: string }[];
}

export const fromEntity = (post: PostDetail): PostDetailDTO => {
  return {
    id: post.id.value,
    title: post.title.value,
    content: post.content.value,
    excerpt: post.excerpt.value,
    postType: post.postType.value,
    tags: post.tags.map(tag => ({ slug: tag.slug.value, name: tag.getDisplayValue() })),
    thumbnail: post.thumbnail?.value ?? null,
    dominantColor: post.dominantColor?.value ?? null,
    createdAt: post.createdAt.value.toISOString(),
    updatedAt: post.updatedAt?.value.toISOString() ?? null,
  };
};

export const toEntity = (post: PostDetailDTO): PostDetail => PostDetail.reconstruct(
  Id.create(post.id),
  Title.create(post.title),
  Content.create(post.content),
  Excerpt.create(post.excerpt),
  PostType.create(post.postType),
  post.tags.map(tag => Tag.reconstruct(Slug.create(tag.slug), Name.create(tag.name))),
  post.thumbnail ? Thumbnail.create(post.thumbnail) : undefined,
  post.dominantColor ? DominantColor.create(post.dominantColor) : undefined,
  CreatedAt.create(post.createdAt),
  post.updatedAt ? UpdatedAt.create(post.updatedAt) : undefined,
);
