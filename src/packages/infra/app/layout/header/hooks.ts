import type { Props } from '$/domain/app/layout/header';
import type { Settings } from '$/domain/app/settings';
import type { IDarkMode } from '$/domain/app/theme/darkMode';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHooks = ({ headerPages }: Props, settings: Settings, darkMode: IDarkMode) => {
  return {
    title: settings.seo.blogTitle,
    pages: headerPages,
    toggleColorMode: darkMode.toggleColorMode(),
  };
};
export type HooksParams = ReturnType<typeof useHooks>;
