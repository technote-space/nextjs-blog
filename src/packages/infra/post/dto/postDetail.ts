import type { PostDTO } from '$/infra/post/dto/post';
import { getAverageColor } from 'fast-average-color-node';
import { PostDetail } from '$/domain/post/entity/postDetail';

export type PostDetailDTO = PostDTO & {
  content: string;
  dominantColor?: string;
  url: string;
}

const getDominantColor = async (thumbnail: string): Promise<string> => {
  const color = await getAverageColor(thumbnail, {
    defaultColor: [255, 255, 255, 255],
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
          excerpt: post.getExcerpt().value,
          thumbnail: thumbnail ?? null,
          dominantColor: color,
          url: `/posts/${post.getId().value}`,
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
    excerpt: post.getExcerpt().value,
    thumbnail: thumbnail ?? null,
    url: `/posts/${post.getId().value}`,
    createdAt: post.getCreatedAt().value.toISOString(),
    updatedAt: post.getUpdatedAt()?.value.toISOString() ?? null,
  };
};
