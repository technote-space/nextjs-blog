import type { Settings } from '$/domain/app/settings';
import { Post } from '$/domain/post/entity/post';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHooks = (settings: Settings) => {
  return {
    author: settings.seo.author,
    pages: (settings.pages?.footer ?? []).map(page => ({
      label: page.title,
      url: Post.createUrlFromPostData(page, settings),
    })),
  };
};
export type HooksParams = ReturnType<typeof useHooks>;
