import type { Props } from '$/domain/app/layout/footer';
import type { Settings } from '$/domain/app/settings';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHooks = ({ footerPages }: Props, settings: Settings) => {
  return {
    author: settings.seo.author,
    pages: footerPages,
  };
};
export type HooksParams = ReturnType<typeof useHooks>;
