import type { Settings } from '$/domain/app/settings';
import type { IDarkMode } from '$/domain/app/theme/darkMode';
import type { Props } from '$/domain/pages/post';
import { toEntity as toPostEntity } from '$/domain/post/dto/post';
import { toEntity as toPostDetailEntity } from '$/domain/post/dto/postDetail';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHooks = ({
  headerPages,
  footerPages,
  post,
  prev,
  next,
}: Props, settings: Settings, darkMode: IDarkMode) => {
  const entity = toPostDetailEntity(post);
  const darkModeClass = darkMode.useColorModeValue('light', 'dark');

  return {
    layoutProps: {
      headerPages,
      footerPages,
      seo: {
        title: entity.title.value,
        description: entity.excerpt.value,
        image: entity.thumbnail?.value,
        canonical: entity.getUrl(),
      },
    },
    viewProps: {
      post: entity,
      prev: prev ? toPostEntity(prev) : undefined,
      next: next ? toPostEntity(next) : undefined,
      hideDate: (settings.postType?.hideDate ?? []).includes(entity.postType.value),
      darkModeClass,
    },
  };
};
export type HooksParams = ReturnType<typeof useHooks>;
