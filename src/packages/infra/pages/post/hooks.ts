import type { Props } from '$/domain/pages/post';
import { toEntity } from '$/infra/post/dto/postDetail';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHooks = ({ post }: Props) => {
  const entity = toEntity(post);

  return {
    layoutProps: {
      seo: {
        title: entity.getTitle().value,
        description: entity.getExcerpt().value,
        image: entity.getThumbnail()?.value,
        canonical: `/posts/${entity.getId().value}`,
      },
    },
    viewProps: {
      post: entity,
    },
  };
};
export type HooksParams = ReturnType<typeof useHooks>;
