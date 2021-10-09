import type { Props } from '$/domain/app/layout/header'
  ;
import type { Settings } from '$/domain/app/settings';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHooks = ({ headerPages }: Props, settings: Settings) => {
  return {
    title: settings.seo.blogTitle,
    pages: headerPages,
  };
};
export type HooksParams = ReturnType<typeof useHooks>;
