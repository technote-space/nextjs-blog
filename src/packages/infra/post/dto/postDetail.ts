import type { PostDTO } from '$/infra/post/dto/post';
import { getAverageColor } from 'fast-average-color-node';
import { PostDetail } from '$/domain/post/entity/postDetail';
import Content from '$/domain/post/valueObject/content';
import CreatedAt from '$/domain/post/valueObject/createdAt';
import Id from '$/domain/post/valueObject/id';
import Thumbnail from '$/domain/post/valueObject/thumbnail';
import Title from '$/domain/post/valueObject/title';
import UpdatedAt from '$/domain/post/valueObject/updatedAt';

export type PostDetailDTO = Omit<PostDTO, 'excerpt'> & {
  content: string;
  dominantColor?: string;
}

const getDominantColor = async (thumbnail: string): Promise<string> => {
  const color = await getAverageColor(thumbnail, {
    defaultColor: [255, 255, 255, 255]
  });
  return color.rgba;
};

export const fromEntity = async (post: PostDetail): Promise<PostDetailDTO> => {
  const thumbnail = post.getThumbnail()?.value;
  if (thumbnail) {
    for (let i = 3; --i >= 0;) {
      try {
        const color = await getDominantColor(thumbnail);
        return {
          id: post.getId().value,
          title: post.getTitle().value,
          content: post.getContent().value,
          thumbnail: thumbnail ?? null,
          dominantColor: color,
          createdAt: post.getCreatedAt().value.toISOString(),
          updatedAt: post.getUpdatedAt()?.value.toISOString() ?? null,
        };
      } catch (error) {
        console.log(error);
      }
    }
  }

  return {
    id: post.getId().value,
    title: post.getTitle().value,
    content: post.getContent().value,
    thumbnail: thumbnail ?? null,
    createdAt: post.getCreatedAt().value.toISOString(),
    updatedAt: post.getUpdatedAt()?.value.toISOString() ?? null,
  };
};

export const toEntity = (post: PostDetailDTO): PostDetail => PostDetail.reconstruct(
  Id.create(post.id),
  Title.create(post.title),
  Content.create(post.content),
  post.thumbnail ? Thumbnail.create(post.thumbnail) : undefined,
  CreatedAt.create(post.createdAt),
  post.updatedAt ? UpdatedAt.create(post.updatedAt) : undefined,
);
