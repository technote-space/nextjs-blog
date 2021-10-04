import type { Settings } from '$/domain/app/settings';
import type { Props } from '$/domain/pages/post';
import { toEntity } from '$/domain/post/dto/postDetail';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHooks = ({ headerPages, footerPages, post }: Props, settings: Settings) => {
  const entity = toEntity(post);

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
      hideDate: (settings.postType?.hideDate ?? []).includes(entity.getPostType().value),
    },
  };
};
export type HooksParams = ReturnType<typeof useHooks>;
