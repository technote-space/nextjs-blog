import type { Settings } from '$/domain/app/settings';
import type { Props } from '$/domain/pages/post';
import { toEntity as toPostEntity } from '$/domain/post/dto/post';
import { toEntity as toPostDetailEntity } from '$/domain/post/dto/postDetail';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHooks = ({ headerPages, footerPages, post, prev, next }: Props, settings: Settings) => {
  const entity = toPostDetailEntity(post);

  return {
    layoutProps: {
      headerPages,
      footerPages,
      seo: {
        title: entity.getTitle().value,
        description: entity.getExcerpt().value,
        image: entity.getThumbnail()?.value,
        canonical: entity.getUrl(),
      },
    },
    viewProps: {
      post: entity,
      prev: prev ? toPostEntity(prev) : undefined,
      next: next ? toPostEntity(next) : undefined,
      hideDate: (settings.postType?.hideDate ?? []).includes(entity.getPostType().value),
    },
  };
};
export type HooksParams = ReturnType<typeof useHooks>;
