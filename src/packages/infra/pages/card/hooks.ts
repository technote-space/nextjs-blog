import type { Props } from '$/domain/pages/card';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHooks = ({ url, image, dominantColor, title, description, canonical, source }: Props) => {
  return { url, image, dominantColor, title, description, canonical, source };
};
export type HooksParams = ReturnType<typeof useHooks>;
