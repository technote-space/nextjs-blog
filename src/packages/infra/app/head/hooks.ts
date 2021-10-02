import type { Props } from '$/domain/app/head';
import type { Settings } from '$/domain/app/settings';
import { getAbsoluteUrl } from '@/lib/helpers/url';

const getUrl = (props: Props, settings: Settings) => {
  if (props.canonical) {
    return getAbsoluteUrl(props.canonical, settings);
  }

  return settings.siteUrl;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHooks = (props: Props, settings: Settings) => {
  const title = props.title ? `${props.title} | ${settings.seo.blogTitle}` : settings.seo.blogTitle;
  const description = (props.description || settings.seo.description).replace(/\r?\n/g, ' ').replace(/\s{2,}/, ' ');
  const image = getAbsoluteUrl(props.image || settings.seo.blogImage || `https://og-image.vercel.app/${encodeURI(title)}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`, settings);
  const url = getUrl(props, settings);
  const type = props.title ? 'article' : 'website';
  const twitter = settings.seo.twitter ? `@${settings.seo.twitter.replace(/^@/, '')}` : undefined;

  return {
    title,
    description,
    image,
    url,
    type,
    twitter,
  };
};
export type HooksParams = ReturnType<typeof useHooks>;
