import type { Props } from '$/domain/app/layout/footer';
import type { Settings } from '$/domain/app/settings';
import type { IDarkMode } from '$/domain/app/theme/darkMode';
import { useScroll } from '$/infra/app/layout/footer/useScroll';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHooks = ({ footerPages }: Props, settings: Settings, darkMode: IDarkMode) => {
  const { scrollButtonClass, scrollToTop } = useScroll();
  const darkModeClass = darkMode.useColorModeValue('light', 'dark');

  return {
    author: settings.seo.author,
    pages: footerPages,
    scrollButtonClass,
    scrollToTop,
    darkModeClass,
  };
};
export type HooksParams = ReturnType<typeof useHooks>;
