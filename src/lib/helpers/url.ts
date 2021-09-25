// License MIT @zenn-dev/zenn-editor
// @see https://github.com/zenn-dev/zenn-editor
// @see https://github.com/zenn-dev/zenn-editor/blob/main/packages/zenn-markdown-html/src/utils/url-matcher.ts

import { pregQuote } from '@/lib/helpers/string';

export const isTweetUrl = (url: string): boolean => /^https:\/\/twitter\.com\/[a-zA-Z0-9_-]+\/status\/[a-zA-Z0-9?=]+$/.test(url);

export const isStackblitzUrl = (url: string): boolean => /^https:\/\/stackblitz\.com\/[a-zA-Z0-9\-_/.@?&=%]+$/.test(url);

export const isCodesandboxUrl = (url: string): boolean => /^https:\/\/codesandbox\.io\/embed\/[a-zA-Z0-9\-_/.@?&=%]+$/.test(url);

export const isCodepenUrl = (url: string): boolean => /^https:\/\/codepen\.io\/[a-zA-Z0-9]/.test(url);

export const isJsfiddleUrl = (url: string): boolean => /^(http|https):\/\/jsfiddle\.net\/[a-zA-Z0-9_,/-]+$/.test(url);

const youtubeRegexp = /^(http(s?):\/\/)?(www\.)?youtu(be)?\.([a-z])+\/(watch(.*?)([?&])v=)?(.*?)(&(.)*)?$/;

export function extractYoutubeVideoParameters(
  youtubeUrl: string,
): { videoId: string; start?: string } | undefined {
  const match = youtubeUrl.match(youtubeRegexp);
  if (match && match[9].length == 11) {
    const urlParams = new URLSearchParams(youtubeUrl);
    const start = urlParams.get('t');
    return {
      videoId: match[9],
      start: start?.replace('s', ''), // https://www.youtube.com/watch?v=ABCSDGG&t=19101s => 19101
    };
  } else {
    return undefined;
  }
}

export const isYoutubeUrl = (url: string): boolean => youtubeRegexp.test(url);

export function isValidHttpUrl(str: string) {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

const extractLinks = (text: string): RegExpMatchArray[] => Array.from(text.matchAll(/^(<p>)?(<a[^>]+?>)?(https?:\/\/[-_.!~*'()a-zA-Z0-9;\/?:@&=+$,%#]+)(<\/a>)?(?!.*<br *\/?>).*?(<\/p>)?/img));
export const replaceLinks = async (text: string, replace: (url: string) => Promise<string>): Promise<string> => {
  return extractLinks(text).reduce(async (prev, match) => {
    const acc = await prev;
    if (match[0].includes('p>') && (!match[0].includes('<p>') || !match[0].includes('</p>'))) {
      return acc;
    }

    const url = match[3];
    return acc.replace(new RegExp(`^${pregQuote(match[0], '/')}`, 'img'), await replace(url));
  }, Promise.resolve(text));
};

export const getDomainName = (url: string): string => {
  return new URL(url).hostname;
}
